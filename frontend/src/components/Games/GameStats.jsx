import React, { useEffect, useState } from "react";
import { API } from "../../api";
import { gameStatsURL, getGoalScorersURL } from "../../api/games"; 
import GamesTable from "./GamesTable";
import GameStatsProjection from './GameStatsProjection';

const GameStats = () => {
  const [games, setGames] = useState([]);
  const [colnames, setColnames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goalScorers, setGoalScorers] = useState(null);

  const getGoalScorers = (gameId) => {
    API.get(getGoalScorersURL(gameId)).then((res) => {
      setGoalScorers(res.data.data);
    });
  };
  

  useEffect(() => {
    API.get(gameStatsURL).then((res) => {
      const data = res?.data;
      setGames(data?.rows);
      setColnames(data?.colnames);
      setLoading(false);
    });
  }, []);

  let content;
  if (loading) {
    content = (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    content = (
      <div className="inline-block max-w-full mt-10">
        <GamesTable rows={games} colnames={[...colnames,"deletion","update"]} getGoalScorers={getGoalScorers} />
         {goalScorers && (
          <div>
            <h3>Goal Scorers for chosen game:</h3>
            <ul>
              {goalScorers.map((player, idx) => (
                <li key={idx}>{`${player.first_name} ${player.last_name}: ${player.goals} goals`}</li>
              ))}
            </ul>
            
          </div>
        )}
        <h3>Filter statistics for games</h3>
            <GameStatsProjection />
      </div>
    );
  }

  return <div className="box-border">{content}</div>;
};

export default GameStats;
