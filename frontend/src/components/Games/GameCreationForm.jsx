import React, { useState } from "react";
import Selection from "./Selection";
import FormInput from "./FormInput";
import { API } from "../../api";
import { gameCreationURL } from "../../api/games";

const INITIAL = {
  Game_ID: "",
  HomeClubID: "",
  AwayClubID: "",
  Age_group: "",
  Goals: "",
  Stadium_ID: "",
  Competition: "",
  SeasonYear: "",
  Match_Date: "",
  Odds: "",
  Lineup: "",
  Substitutions: "",
  Yellow_cards: "",
  Red_cards: "",
  xG: "",
  Ball_possession: "",
  Goal_Attempts: "",
  Shots_on_Goal: "",
  Shots_off_Goal: "",
  Blocked_Shots: "",
  Corner_kicks: "",
  Offsides: "",
  Goalkeeper_saves: "",
  Fouls: "",
  Total_Passes: "",
  Completed_Passes: "",
  Tackles: "",
  Attacks: "",
  Dangerous_attacks: "",
  League_ID: "",
};

const GameCreationForm = ({ teamIDs, stadiumIDs, leagueIDs }) => {
  const [newGame, setNewGame] = useState(INITIAL);
  const handleCreation = (e) => {
    console.log(newGame);
    e.preventDefault();
    API.post(gameCreationURL+`?newGame=${JSON.stringify(newGame)}`).then((res) => {
      alert(res?.data?.message);
    });
  };
  const handleChange = (colname, val) => {
    setNewGame({ ...newGame, [colname]: val });
  };
  return (
    <>
      <div className="form-container bg-white max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Game Creation Form</h2>
        <form onSubmit={handleCreation}>
          <Selection
            label={"Home Club ID"}
            htmlFor={"homeclubid"}
            name={"homeclubid"}
            id={"homeclubid"}
            options={teamIDs}
            colname={"HomeClubID"}
            handleChange={handleChange}
          />

          <Selection
            label={"Away Club ID"}
            htmlFor={"awayclubid"}
            name={"awayclubid"}
            id={"awayclubid"}
            options={teamIDs}
            colname={"AwayClubID"}
            handleChange={handleChange}
          />
          <Selection
            label={"Stadium ID"}
            htmlFor={"stadiumid"}
            name={"stadiumid"}
            id={"stadiumid"}
            options={stadiumIDs}
            colname={"Stadium_ID"}
            handleChange={handleChange}
          />
          <Selection
            label={"League ID"}
            htmlFor={"leaguemid"}
            name={"leagueid"}
            id={"leagueid"}
            options={leagueIDs}
            colname={"League_ID"}
            handleChange={handleChange}
          />
            <Selection
            label={"Age Group"}
            htmlFor={"age_group"}
            name={"age_group"}
            id={"age_group"}
            options={["Senior","Junior","Youth"]}
            colname={"Age_group"}
            handleChange={handleChange}
          />
          <FormInput
            label={"Goals"}
            id={"goals"}
            type={"number"}
            colname={"Goals"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Competition"}
            id={"comp"}
            type={"text"}
            colname={"Competition"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Season Year"}
            id={"season"}
            type={"text"}
            colname={"SeasonYear"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Match Date"}
            id={"mdate"}
            type={"date"}
            colname={"Match_Date"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Odds"}
            id={"odds"}
            type={"number"}
            colname={"Odds"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Lineup"}
            id={"lineup"}
            type={"text"}
            colname={"Lineup"}
            handleChange={handleChange}
            required={true}
            placeholder={"example: 4-3-3"}
          />
          <FormInput
            label={"Substitutions"}
            id={"subs"}
            type={"text"}
            colname={"Substitutions"}
            handleChange={handleChange}
            required={true}
            placeholder={"Names of subs"}
          />
          <FormInput
            label={"Yellow Cards"}
            id={"yc"}
            type={"number"}
            colname={"Yellow_cards"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Red Cards"}
            id={"rc"}
            type={"number"}
            colname={"Red_cards"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"xG"}
            id={"xG"}
            type={"number"}
            colname={"xG"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Ball Possession"}
            id={"bp"}
            type={"number"}
            colname={"Ball_possession"}
            handleChange={handleChange}
            required={true}
          />

          <FormInput
            label={"Goal Attempts"}
            id={"ga"}
            type={"number"}
            colname={"Goal_Attempts"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Shots on Goal"}
            id={"sog"}
            type={"number"}
            colname={"Shots_on_Goal"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Shots off Goal"}
            id={"soffg"}
            type={"number"}
            colname={"Shots_off_Goal"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Blocked Shots"}
            id={"blocked_shots"}
            type={"number"}
            colname={"Blocked_Shots"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Corner Kicks"}
            id={"corners"}
            type={"number"}
            colname={"Corner_kicks"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Offsides"}
            id={"offsides"}
            type={"number"}
            colname={"Offsides"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Goakepper Saves"}
            id={"saves"}
            type={"number"}
            colname={"Goalkeeper_saves"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Fouls"}
            id={"fouls"}
            type={"number"}
            colname={"Fouls"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Total Passes"}
            id={"tpasses"}
            type={"number"}
            colname={"Total_Passes"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Completed Passes"}
            id={"cpasses"}
            type={"number"}
            colname={"Completed_Passes"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Tackles"}
            id={"tackles"}
            type={"number"}
            colname={"Tackles"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Attacks"}
            id={"attacks"}
            type={"number"}
            colname={"Attacks"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Dangerous Attacks"}
            id={"dangerous_attacks"}
            type={"number"}
            colname={"Dangerous_attacks"}
            handleChange={handleChange}
            required={true}
          />
          <FormInput
            label={"Unique Game_ID"}
            id={"Game_ID"}
            type={"text"}
            colname={"Game_ID"}
            handleChange={handleChange}
            required={true}
          />

          <input
            type="submit"
            className="submit-btn bg-blue-500 hover:bg-blue-600 text-white uppercase py-5 px-10 mt-10 rounded-md"
          />
        </form>
      </div>
    </>
  );
};

export default GameCreationForm;
