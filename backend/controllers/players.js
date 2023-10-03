const db = require("../config/db");

const getPlayerStats = async (req, res) => {
  const filters = JSON.parse(req.query.filters);

  const whereConditions = [];

  Object.keys(filters).forEach((attribute) => {
    whereConditions.push(`${attribute} = '${filters[attribute]}'`);
  });

  const whereClause = whereConditions.join(" AND ");
  console.log(whereClause);
  const query = `SELECT
    p.ID,
    p.First_name,
    p.Last_name,
    p.PlayerNumber,
    p.Height,
    p.PlayerWeight,
    p.Position,
    p.Active_foot,
    p.Nationality,
    pb.birthdate AS Date_of_Birth,
    s.Game_ID,
    s.Minutes_played,
    s.Assists,
    s.Goals,
    s.Shots_taken,
    s.Shots_on_goal,
    s.Shots_taken_inside_box,
    s.Shots_taken_outside_box,
    s.Passes_attempted,
    s.Passes_complete,
    s.Key_passes_attempted,
    s.Key_passes_completed,
    s.Crosses,
    s.Aerial_challenges_attempted,
    s.Aerial_challenges_success
FROM
    PlayerGeneralInfo p
JOIN
    PlayerBirthInfo pb ON p.birthdate = pb.birthdate
LEFT JOIN
    Statistics_Per_Game_Per_Player s ON p.ID = s.Player_ID
WHERE ${whereClause};`;
  try {
    // allow user to select position, team, league, nationality etc
    if (!filters) {
      return res.status(400).json({
        success: false,
        message: "Request must have non empty and valid filters",
      });
    }
    const data = await db.query(query);
    let colnames = [];
    if (data?.rows && data?.rows.length > 0) {
      const row = data.rows[0];
      colnames = Object.keys(row);
    }
    console.log(data)
    return res.status(200).json({ rows: data.rows, colnames: colnames });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: "Something went wrong" });
  }
};

// Creating the DELETE API endpoint
const deletePlayer = async (req, res) => {
  const { playerId } = req.params;
  try {
    const deleteQuery = `DELETE FROM PlayerGeneralInfo WHERE ID = $1`;
    await db.query(deleteQuery, [playerId]);
    return res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: "Something went wrong" });
  }
};


const getGamesWherePlayerScored = async (req, res) => {
  const { playerId } = req.params;

  const query = `
  SELECT s.Game_ID
  FROM Statistics_Per_Game_Per_Player AS s
  WHERE s.Player_ID = $1 AND s.Goals > 0;
  `;

  try {
    const result = await db.query(query, [playerId]);
    console.log(playerId);
    console.log('Result:', result.rows);
    return res.status(200).json({ games: result.rows });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const getSelectionResutls = async (req, res) => {
  const query = req.query.query;
  console.log("Received request:", req.query);


  try {
    const result = await db.query(query);
    console.log(query);
    console.log('Result:', result.rows);
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const getPlayersWhoScoredInEveryGame = async (req, res) => {
  const query = `
    SELECT p.ID, p.First_name, p.Last_name
    FROM PlayerGeneralInfo p
    WHERE NOT EXISTS (
      SELECT g.Game_ID
      FROM Game g
      WHERE EXISTS (
        SELECT s.Game_ID
        FROM Statistics_Per_Game_Per_Player s
        WHERE s.Player_ID = p.ID AND s.Game_ID = g.Game_ID
      )
      AND NOT EXISTS (
        SELECT s.Game_ID
        FROM Statistics_Per_Game_Per_Player s
        WHERE s.Player_ID = p.ID AND s.Game_ID = g.Game_ID AND s.Goals > 0
      )
    );
  `;

  try {
    const result = await db.query(query);
    console.log('Result:', result.rows);
    return res.status(200).json({ players: result.rows });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const getPlayerCountByClub = async (req, res) => {
  const query = `
      SELECT clubID, COUNT(ID) as Count
      FROM PlayerGeneralInfo
      GROUP BY clubID;
  `;

  try {
      const result = await db.query(query);
      console.log('Result:', result.rows);
      return res.status(200).json({ data: result.rows });
  } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};





const getPlayerAverageStats = async (req, res) => {
  // This query finds the average stats of the top 50 goal scorers for each season
  const GOALS_THRESHOLD = 50;
  const query = `SELECT
    sg.SeasonYear,
    sg.ID,
    AVG(sg.Goals) AS Average_Goals,
    AVG(sg.Assists) AS Average_Assists,
    AVG(sg.Minutes_played) AS Average_Minutes_played,
    AVG(sg.Shots_taken) AS Average_Shots_taken,
    AVG(sg.Shots_on_goal) AS Average_Shots_on_goal,
    AVG(sg.Shots_taken_inside_box) AS Average_Shots_inside_box,
    AVG(sg.Shots_taken_outside_box) AS Average_Shots_outside_box,
    AVG(sg.Passes_attempted) AS Average_Passes_attempted,
    AVG(sg.Passes_complete) AS Average_Passes_complete,
    AVG(sg.Key_passes_attempted) AS Average_Key_passes_attempted,
    AVG(sg.Key_passes_completed) AS Average_Key_passes_completed,
    AVG(sg.Crosses) AS Average_Crosses,
    AVG(sg.Aerial_challenges_attempted) AS Average_Aerial_challenges_attempted,
    AVG(sg.Aerial_challenges_success) AS Average_Aerial_challenges_success
FROM (
    SELECT
        p.ID,
        g.SeasonYear,
        spg.Goals,
        spg.Assists,
        spg.Minutes_played,
        spg.Shots_taken,
        spg.Shots_on_goal,
        spg.Shots_taken_inside_box,
        spg.Shots_taken_outside_box,
        spg.Passes_attempted,
        spg.Passes_complete,
        spg.Key_passes_attempted,
        spg.Key_passes_completed,
        spg.Crosses,
        spg.Aerial_challenges_attempted,
        spg.Aerial_challenges_success,
        RANK() OVER(PARTITION BY g.SeasonYear ORDER BY spg.Goals DESC) AS Goal_Rank
    FROM Statistics_Per_Game_Per_Player spg
    JOIN PlayerGeneralInfo p ON spg.Player_ID = p.ID
    JOIN Game g ON spg.Game_ID = g.Game_ID
) sg
WHERE sg.Goal_Rank <= ${GOALS_THRESHOLD}
GROUP BY sg.SeasonYear, sg.ID
ORDER BY sg.SeasonYear, sg.ID;

 `;
  try {
    const data = await db.query(query);
    let colnames = [];
    if (data?.rows && data?.rows.length > 0) {
      const row = data.rows[0];
      colnames = Object.keys(row);
    }
    return res.status(200).json({ rows: data.rows, colnames: colnames });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "Sorry, something went wrong" });
  }
};
module.exports = {getSelectionResutls, getPlayerCountByClub, getPlayerStats, deletePlayer, getGamesWherePlayerScored, getPlayersWhoScoredInEveryGame,getPlayerAverageStats };
