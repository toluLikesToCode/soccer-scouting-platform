import React, { useState } from "react";
import { API } from "../../api";
import AttributesForm from "./AttributesForm";
import CondForm from "./CondForm";
import DisplayTable from "./DisplayTable";

const tableNames = [
  "ClubIdentity",
  "ClubMainInfo",
  "League",
  "Season",
  "Staff",
  "Team",
  "PlayerGeneralInfo",
  "Stadium",
  "Game",
  "Statistics_Per_Game_Per_Player",
];

const conditions = {
  ClubIdentity: ["ClubName-equal", "Nickname-equal", "Team_color-equal"],
  ClubMainInfo: ["ClubOwner-equal", "City-equal", "ClubName-equal"],
  League: [
    "Country-equal",
    "LeagueName-equal",
    "Num_teams-equal",
    "Num_teams-less",
    "Num_teams-greater",
    "Num_relegations-equal",
    "Num_relegations-less",
    "Num_relegations-greater",
    "Num_promotions-equal",
    "Num_promotions-less",
    "Num_promotions-greater",
  ],
  Season: [
    "SeasonYear-equal",
    "League_ID-equal",
    "Champions-equal",
    "Goals_Scored-equal",
  ],
  Staff: [
    "First_name-equal",
    "Last_name-equal",
    "Position-equal",
    "Nationality-equal",
    "Playing_career_position-equal",
    "ContractDate-equal",
  ],
  Team: ["Age_group-equal", "League_ID-equal"],
  PlayerGeneralInfo: [
    "First_name-equal",
    "Last_name-equal",
    "PlayerNumbe-equal",
    "birthdate-less",
    "birthdate-greater",
    "Height-equal",
    "Height-less",
    "Height-greater",
    "PlayerWeight-equal",
    "PlayerWeight-less",
    "PlayerWeight-greater",
    "Position-equal",
    "Active_foot-equal",
    "Nationality-equal",
    "teamID-equal",
  ],
  Stadium: ["Seats_capacity-less", "Seats-capacity-greater"],
  Game: [
    "Age_group-equal",
    "Goals-less",
    "Goals-greater",
    "Stadium_ID-equal",
    "SeasonYear-equal",
    "Match_Date-equal",
    "Yellow_cards-equal",
    "Yellow_cards-less",
    "Yellow_cards-greater",
    "Red_cards-equal",
    "Red_cards-less",
    "Red_cards-greater",
    "League_ID-equal",
  ],
  Statistics_Per_Game_Per_Player: [
    "Game_ID-equal",
    "Player_ID-equal",
    "Minutes-played",
    "Assists-equal",
    "Assists-less",
    "Assists-greater",
    "Goals-equal",
    "Goals-less",
    "Goals-greater",
  ],
};

const databaseSchema = {
  ClubIdentity: ["ClubName", "Nickname", "Team_color"],
  ClubMainInfo: [
    "ClubOwner",
    "Founded",
    "Website",
    "City",
    "Club_ID",
    "ClubName",
  ],
  League: [
    "ID",
    "Country",
    "LeagueName",
    "Num_teams",
    "Num_relegations",
    "Num_promotions",
    "Num_continental_competition_spots",
    "Domestic_Cups_rules",
    "International_Cups_rules",
    "Confederation",
    "Founded",
    "Organizing_body",
    "Current_Champion",
    "Most_Championships",
    "TV_partners",
    "Website",
    "Level_on_Pyramid",
    "Relegation_to",
    "Promotion_to",
  ],
  Season: [
    "SeasonYear",
    "League_ID",
    "Champions",
    "Relegated",
    "Standings",
    "Matches",
    "Teams",
    "Goals_Scored",
    "Top_Goalscorer",
    "Best_Goalkeeper",
    "Biggest_home_win",
    "Biggest_away_win",
    "Highest_scoring_game",
    "Longest_winning_run",
    "Longest_unbeaten_run",
    "Longest_winless_run",
    "Longest_losing_run",
    "Highest_attendance",
    "Lowest_attendance",
    "Total_attendance",
    "Average_attendance",
  ],
  Staff: [
    "ID",
    "First_name",
    "Last_name",
    "Club_ID",
    "Position",
    "Nationality",
    "Playing_career_position",
    "Past_clubs",
    "ContractDate",
  ],
  PlayerBirthInfo: ["birthdate", "age"],
  Team: ["Club_ID", "Age_group", "Coach_Manager", "League_ID"],
  PlayerGeneralInfo: [
    "ID",
    "First_name",
    "Last_name",
    "PlayerNumber",
    "Height",
    "PlayerWeight",
    "Position",
    "Active_foot",
    "Nationality",
    "AgentID",
    "clubID",
    "teamID",
    "birthdate",
    "Age_group",
  ],
  Goalkeeper: ["Player_ID", "Throwing_arm"],
  Stadium: ["ID", "Location", "StadiumName", "Seats_capacity"],
  Game: [
    "Game_ID",
    "HomeClubID",
    "AwayClubID",
    "Age_group",
    "Goals",
    "Stadium_ID",
    "Competition",
    "SeasonYear",
    "Match_Date",
    "Odds",
    "Lineup",
    "Substitutions",
    "Yellow_cards",
    "Red_cards",
    "xG",
    "Ball_possession",
    "Goal_Attempts",
    "Shots_on_Goal",
    "Shots_off_Goal",
    "Blocked_Shots",
    "Corner_kicks",
    "Offsides",
    "Goalkeeper_saves",
    "Fouls",
    "Total_Passes",
    "Completed_Passes",
    "Tackles",
    "Attacks",
    "Dangerous_attacks",
    "League_ID",
  ],
  Statistics_Per_Game_Per_Player: [
    "ID",
    "Game_ID",
    "Player_ID",
    "Minutes_played",
    "Assists",
    "Goals",
    "Shots_taken",
    "Shots_on_goal",
    "Shots_taken_inside_box",
    "Shots_taken_outside_box",
    "Passes_attempted",
    "Passes_complete",
    "Key_passes_attempted",
    "Key_passes_completed",
    "Crosses",
    "Aerial_challenges_attempted",
    "Aerial_challenges_success",
  ],
};

const TableSelection = () => {
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedConds, setSelectedConds] = useState({});
  const [display, setDisplay] = useState(false);
  const [tableDisplay, setTableDisplay] = useState(false);

  const [rows, setRows] = useState({});
  const [colnames, setColnames] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (table) => {
    setTableDisplay(false);
    setLoading(true);
    setSelectedTable(table);
    setDisplay(true);
    setLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const conds = JSON.stringify(selectedConds);
    const formattedAttributes = selectedAttributes
      .map((attr) => `attributes=${attr}`)
      .join("&");

    API.get(
      `/tables/select?table=${selectedTable}&${formattedAttributes}&conditions=${conds}`
    ).then((res) => {
      setRows(res?.data?.rows);
      setColnames(res?.data?.colnames);
      setSelectedAttributes([]);
      setSelectedConds({});
      setSelectedTable("");
      setTableDisplay(true);
      console.log(res);
    });
  };
  if (loading) {
    return <h1>LOADING...</h1>;
  }
  return (
    <div className="h-full">
      <div className="form-group mb-4 shadow-lg border-2  w-1/2 my-10 py-5 bg-gray-50 block m-auto">
        <label htmlFor={"table"} className="block font-semibold mb-1">
          Select a Table
        </label>
        <select
          id={"table"}
          name={"table"}
          className="w-full py-2 px-4 border border-gray-300 rounded-md"
          onChange={(e) => handleChange(e.target.value)}
        >
          {tableNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {display && (
        <div>
          <div>
            <h2 className="text-blue-600 font-sans">
              Please, select the attributes you want
            </h2>
            <AttributesForm
              options={databaseSchema[selectedTable]}
              selections={selectedAttributes}
              setSelections={setSelectedAttributes}
            />
          </div>
          <div>
            <h2 className="text-blue-600 font-sans">
              Please, define your conditions
            </h2>
            <CondForm
              options={conditions[selectedTable]}
              selections={selectedConds}
              setSelections={setSelectedConds}
            />
          </div>
        </div>
      )}
      <button
        className="bg-blue-600 text-white uppercase w-24 rounded-md px-5 py-2 mx-2  mt-10 justify-center text-center"
        onClick={handleSubmit}
      >
        SEND
      </button>
      <div>
        {tableDisplay && <DisplayTable rows={rows} colnames={colnames} />}
      </div>
    </div>
  );
};

export default TableSelection;
