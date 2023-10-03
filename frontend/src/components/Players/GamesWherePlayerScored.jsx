import React, { useState } from 'react';
import { API } from "../../api";
import { getGamesWherePlayerScoredURL } from '../../api/players';

const GamesWherePlayerScored = () => {
  const [playerId, setPlayerId] = useState('');
  const [games, setGames] = useState([]);

  const handleInputChange = (e) => {
    setPlayerId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.get(getGamesWherePlayerScoredURL(playerId));
      console.log('Response:', response);
      setGames(response.data.games);
    } catch (error) {
      alert('Something went wrong! Please check if the player ID is correct.');
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Player ID:
          <input type="text" value={playerId} onChange={handleInputChange} />
        </label>
        <button type="submit">Find Games</button>
      </form>
      {games.map((game) => (
        <div key={game.game_id}>Game ID: {game.game_id}</div>
      ))}
    </div>
  );
};

export default GamesWherePlayerScored;
