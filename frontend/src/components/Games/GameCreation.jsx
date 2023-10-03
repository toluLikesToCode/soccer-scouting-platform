import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GameCreationForm from "./GameCreationForm";

const GameCreation = () => {
  const [teamIds, setTeamIds] = useState([]);
  const [leagueIds, setLeagueIds] = useState([]);
  const [stadiumIds, setStadiumIds] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serializedLeagues = params.get("leagues");
    const serializedStadiums = params.get("stadiums");
    const serializedTeams = params.get("teams");

    if (serializedLeagues) {
      const decodedLeagues = JSON.parse(decodeURIComponent(serializedLeagues));
      console.log(decodedLeagues);
      setLeagueIds(decodedLeagues);
    }
    if (serializedTeams) {
      const decodedTeams = JSON.parse(decodeURIComponent(serializedTeams));
      console.log(decodedTeams);
      setTeamIds(decodedTeams);
    }
    if (serializedStadiums) {
      const decodedStadiums = JSON.parse(
        decodeURIComponent(serializedStadiums)
      );
      console.log(decodedStadiums);
      setStadiumIds(decodedStadiums);
    }
  }, [location.search]);

  return (
    <>
      <GameCreationForm
        teamIDs={teamIds}
        stadiumIDs={stadiumIds}
        leagueIDs={leagueIds}
      />
    </>
  );
};

export default GameCreation;
