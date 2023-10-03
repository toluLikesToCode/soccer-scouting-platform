import React, { useState } from 'react';
import { API } from "../../api";
import { getPlayersWhoScoredInEveryGameURL } from '../../api/players';

const PlayersWhoScoredInEveryGame = () => {
  const [players, setPlayers] = useState([]);

  const fetchPlayers = async () => {
    try {
      const response = await API.get(getPlayersWhoScoredInEveryGameURL());
      setPlayers(response.data.players);
    } catch (error) {
      alert('Something went wrong! Please try again later.');
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={fetchPlayers}>Find Players Who Scored In Every Game</button>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            <table>
              <tr>
                <th className="px-6 mx-6">{player.id}</th>
                <th className="px-6 mx-6">{player.first_name}</th>
                <th className="px-6 mx-6">{player.last_name}</th>
               
              </tr>
              </table>
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersWhoScoredInEveryGame;
