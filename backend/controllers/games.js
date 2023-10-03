const db = require("../config/db");

const addGame = async (req, res) => {

  const newGame = JSON.parse(req.query.newGame);
  console.log(newGame);
  try {
    const query = `
      INSERT 
      INTO Game (Game_ID, HomeClubID, AwayClubID, Age_group, Goals, Stadium_ID, Competition, SeasonYear, Match_Date, Odds, Lineup, Substitutions, Yellow_cards, Red_cards, xG, Ball_possession, Goal_Attempts, Shots_on_Goal, Shots_off_Goal, Blocked_Shots, Corner_kicks, Offsides, Goalkeeper_saves, Fouls, Total_Passes, Completed_Passes, Tackles, Attacks, Dangerous_attacks, League_ID)  
      VALUES ('${newGame.Game_ID}', '${newGame.HomeClubID}', '${newGame.AwayClubID}', '${newGame.Age_group}', '${newGame.Goals}', '${newGame.Stadium_ID}', '${newGame.Competition}', '${newGame.SeasonYear}', '${newGame.Match_Date}', '${newGame.Odds}', '${newGame.Lineup}', '${newGame.Substitutions}', '${newGame.Yellow_cards}', '${newGame.Red_cards}', '${newGame.xG}', '${newGame.Ball_possession}', '${newGame.Goal_Attempts}', '${newGame.Shots_on_Goal}', '${newGame.Shots_off_Goal}', '${newGame.Blocked_Shots}', '${newGame.Corner_kicks}', '${newGame.Offsides}', '${newGame.Goalkeeper_saves}', '${newGame.Fouls}','${newGame.Total_Passes}', '${newGame.Completed_Passes}', '${newGame.Tackles}', '${newGame.Attacks}', '${newGame.Dangerous_attacks}', '${newGame.League_ID}');
    `;
    await db.query(query);
    return res.status(200).json({
      success: true,
      message: `Game added successfully`,
    });
  } catch (error) {
    console.error("Error adding game:", error);
    return res
      .status(404)
      .json({ message: "Game could not be added, something went wrong!" });
  }
};

const updateGame = async (req, res) => {
  const { gameId } = req.params;
  const updates = JSON.parse(req.query.updates);
  //On the frontend, make sure that data is sent as a Object whoses
  // keys are names exactly like the attributes of Game
  const setClause = Object.keys(updates)
    .map((key) => `${key} = '${updates[key]}'`)
    .join(", ");
  try {
    const query = `
      UPDATE Game
      SET  ${setClause}  
      WHERE Game_ID = '${gameId}';
    `;
    console.log(setClause,query)
    console.log(updates)
    await db.query(query);
    return res
      .status(200)
      .json({ message: `Game with ID ${gameId} updated successfully` });
  } catch (error) {
    console.error("Error updating game attributes:", error);
    return res
      .status(400)
      .json({ message: "Game could not be updated, something went wrong!" });
  }
};
const deleteGame = async (req, res) => {
  const { gameId } = req.params;

  try {
    const query = `
      DELETE 
      FROM Game  
      WHERE Game_ID = ${gameId};
    `;
    await db.query(query);
    return res.status(200).json({
      success: true,
      message: `Game with ID ${gameId} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting game:", error);
    return res
      .status(400)
      .json({ message: "Game could not be deleted, something went wrong!" });
  }
};

const getGames = async (req, res) => {
  const query = ` SELECT *
                FROM Game `;

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
    return res.status(404).json({ message: "Oh no, something went wrong!" });
  }
};


const getGameStatsProjection = async (req, res) => {
  const allowedAttributes = [
    'ID',
    'Game_ID',
    'Minutes_played',
    'Assists',
    'Goals',
    'Shots_taken',
    'Shots_on_goal',
    'Shots_taken_inside_box',
    'Shots_taken_outside_box',
    'Passes_attempted',
    'Passes_complete',
    'Key_passes_attempted',
    'Key_passes_completed',
    'Crosses',
    'Aerial_challenges_attempted',
    'Aerial_challenges_success'
  ];

  const selectedAttributes = ['Game_ID'].concat(
    (req.query.attributes || '')
      .split(',')
      .filter(attr => allowedAttributes.includes(attr) && attr !== 'Game_ID')
  );

  if (selectedAttributes.length < 2) {
    return res.status(400).json({ message: "Please select at least one attribute to project on." });
  }

  const projectionQuery = `SELECT ${selectedAttributes.join(', ')} FROM Statistics_Per_Game_Per_Player`;

  try {
    const result = await db.query(projectionQuery);
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


const getGoalScorers = async (req, res) => {
  const { gameId } = req.params;
  // the query allows us to reuse it for different stats. essentialy we use group by to get all the players from a specific game, and than can use having to find players based on a specific statistic 
  const query = `
  SELECT p.First_name, p.Last_name, SUM(s.Goals) AS Goals
  FROM Statistics_Per_Game_Per_Player AS s
  JOIN PlayerGeneralInfo AS p ON s.Player_ID = p.ID
  WHERE s.Game_ID = $1
  GROUP BY s.Game_ID, p.First_name, p.Last_name
  HAVING SUM(s.Goals) > 0;
`;
  try {
    const result = await db.query(query, [gameId]);
    console.log("Query Result:", result.rows);
    return res.status(200).json({ data: result.rows });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}
module.exports = { updateGame, getGames, getGameStatsProjection, getGoalScorers,addGame,deleteGame};


