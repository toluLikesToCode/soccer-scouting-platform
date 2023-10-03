import React, { useState, useEffect } from "react";
import moment from "moment";
import { useLocation } from "react-router-dom";
import FormInput from "./FormInput";
import { gameCreationURL, getGameUpdateURL } from "../../api/games";
import { API } from "../../api";
const INITIAL = [
  "Age_group",
  "Goals",
  "Competition",
  "SeasonYear",
  "Match_Date",
  "Odds",
  "Lineup",
  "Substitutions",
  "Yellow_cards",
  "Red_cards",
  "xG",
  "Ball_possesion",
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
  "Game_ID",
];

const GameUpdateForm = () => {
  const [gameData, setGameData] = useState({});
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serializedGame = params.get("game");

    if (serializedGame) {
      const decodedGame = JSON.parse(decodeURIComponent(serializedGame));
      let data = {};
      for (const key of INITIAL) {
        data[key] = decodedGame[key?.toLowerCase()];
      }
      data["Match_Date"] = moment(decodedGame["Match_Date"]).format(
        "DD/MM/YYYY"
      );
      console.log(data);
      setGameData(data);
    }
  }, [location.search]);
  const handleChange = (colname, val) => {
    setGameData({ ...gameData, [colname]: val });
  };

  const handleSubmit = (e) => {
    //only send non empty updates
    const finalUpdates = INITIAL.reduce((acc, key) => {
      if (gameData[key] !== "") {
        acc[key] = gameData[key];
      }
      return acc;
    }, {});

    console.log(finalUpdates);
    e.preventDefault();
    API.put(getGameUpdateURL(gameData["Game_ID"]) + `?updates=${JSON.stringify(finalUpdates)}`).then(
      (res) => {
        alert(res?.data?.message);
      }
    );
  };
  return (
    <div className="form-container bg-white max-w-md mx-auto p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 uppercase">Game Update Form</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Age Group"}
          id={"age_group"}
          type={"text"}
          colname={"Age_group"}
          handleChange={handleChange}
          value={gameData?.Age_group}
        />
        <FormInput
          label={"Goals"}
          id={"goals"}
          type={"number"}
          colname={"Goals"}
          handleChange={handleChange}
          value={gameData?.Goals}
        />
        <FormInput
          label={"Competition"}
          id={"comp"}
          type={"text"}
          colname={"Competition"}
          handleChange={handleChange}
          value={gameData?.Competition}
        />
        <FormInput
          label={"Season Year"}
          id={"season"}
          type={"text"}
          colname={"SeasonYear"}
          handleChange={handleChange}
          value={gameData?.SeasonYear}
        />
        <FormInput
          label={"Match Date"}
          id={"mdate"}
          type={"date"}
          colname={"Match_Date"}
          handleChange={handleChange}
          value={gameData?.Match_Date}
        />
        <FormInput
          label={"Odds"}
          id={"odds"}
          type={"number"}
          colname={"Odds"}
          handleChange={handleChange}
          value={gameData?.Odds}
        />
        <FormInput
          label={"Lineup"}
          id={"lineup"}
          type={"text"}
          colname={"Lineup"}
          handleChange={handleChange}
          value={gameData?.Lineup}
        />
        <FormInput
          label={"Substitutions"}
          id={"subs"}
          type={"text"}
          colname={"Substitutions"}
          handleChange={handleChange}
          value={gameData?.Substitutions}
        />
        <FormInput
          label={"Yellow Cards"}
          id={"yc"}
          type={"number"}
          colname={"Yellow_cards"}
          handleChange={handleChange}
          value={gameData?.Yellow_cards}
        />
        <FormInput
          label={"Red Cards"}
          id={"rc"}
          type={"number"}
          colname={"Red_cards"}
          handleChange={handleChange}
          value={gameData?.Red_cards}
        />
        <FormInput
          label={"xG"}
          id={"xG"}
          type={"number"}
          colname={"xG"}
          handleChange={handleChange}
          value={gameData?.xG}
        />
        <FormInput
          label={"Ball Possession"}
          id={"bp"}
          type={"number"}
          colname={"Ball_possession"}
          handleChange={handleChange}
          value={gameData?.Ball_possesion}
        />

        <FormInput
          label={"Goal Attempts"}
          id={"ga"}
          type={"number"}
          colname={"Goal_Attempts"}
          handleChange={handleChange}
          value={gameData?.Goal_Attempts}
        />
        <FormInput
          label={"Shots on Goal"}
          id={"sog"}
          type={"number"}
          colname={"Shots_on_Goal"}
          handleChange={handleChange}
          value={gameData?.Shots_on_Goal}
        />
        <FormInput
          label={"Shots off Goal"}
          id={"soffg"}
          type={"number"}
          colname={"Shots_off_Goal"}
          handleChange={handleChange}
          value={gameData?.Shots_off_Goal}
        />
        <FormInput
          label={"Blocked Shots"}
          id={"blocked_shots"}
          type={"number"}
          colname={"Blocked_Shots"}
          handleChange={handleChange}
          value={gameData?.Blocked_Shots}
        />
        <FormInput
          label={"Corner Kicks"}
          id={"corners"}
          type={"number"}
          colname={"Corner_kicks"}
          handleChange={handleChange}
          value={gameData?.Corner_kicks}
        />
        <FormInput
          label={"Offsides"}
          id={"offsides"}
          type={"number"}
          colname={"Offsides"}
          handleChange={handleChange}
          value={gameData?.Offsides}
        />
        <FormInput
          label={"Goakepper Saves"}
          id={"saves"}
          type={"number"}
          colname={"Goalkeeper_saves"}
          handleChange={handleChange}
          value={gameData?.Goalkeeper_saves}
        />
        <FormInput
          label={"Fouls"}
          id={"fouls"}
          type={"number"}
          colname={"Fouls"}
          handleChange={handleChange}
          value={gameData?.Fouls}
        />
        <FormInput
          label={"Total Passes"}
          id={"tpasses"}
          type={"number"}
          colname={"Total_Passes"}
          handleChange={handleChange}
          value={gameData?.Total_Passes}
        />
        <FormInput
          label={"Completed Passes"}
          id={"cpasses"}
          type={"number"}
          colname={"Completed_Passes"}
          handleChange={handleChange}
          value={gameData?.Completed_Passes}
        />
        <FormInput
          label={"Tackles"}
          id={"tackles"}
          type={"number"}
          colname={"Tackles"}
          handleChange={handleChange}
          value={gameData?.Tackles}
        />
        <FormInput
          label={"Attacks"}
          id={"attacks"}
          type={"number"}
          colname={"Attacks"}
          handleChange={handleChange}
          value={gameData?.Attacks}
        />
        <FormInput
          label={"Dangerous Attacks"}
          id={"dangerous_attacks"}
          type={"number"}
          colname={"Dangerous_attacks"}
          handleChange={handleChange}
          value={gameData?.Dangerous_attacks}
        />
        <FormInput
          label={"Unique Game_ID"}
          id={"Game_ID"}
          type={"text"}
          colname={"Game_ID"}
          handleChange={handleChange}
          value={gameData?.Game_ID}
        />

        <input
          type="submit"
          className="submit-btn bg-blue-500 hover:bg-blue-600 text-white py-5 px-10 mx-10  rounded-md"
        />
      </form>
    </div>
  );
};

export default GameUpdateForm;
