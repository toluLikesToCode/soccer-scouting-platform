import React, { useState, useEffect } from 'react';
import { API } from "../../api";
import { gameStatsProjectionURL } from '../../api/games';


const attributes = ["Minutes_played", "Assists", "Goals", "Shots_taken", "Shots_on_goal", "Shots_taken_inside_box", "Shots_taken_outside_box", "Passes_attempted", "Passes_complete", "Key_passes_attempted", "Key_passes_completed", "Crosses", "Aerial_challenges_attempted", "Aerial_challenges_success"];

const GameStatsProjection = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  useEffect(() => {
    if(selectedAttributes.length > 0) {
      const attributesQuery = selectedAttributes.join(',');
      const url = `${gameStatsProjectionURL}?attributes=${attributesQuery}`;


      API.get(url)
        .then((res) => {
          const data = res?.data;
          setStats(data?.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('API call error:', error); 
          setLoading(false);
        });
    }
  }, [selectedAttributes]);

  useEffect(() => {
    
  }, [stats]);

  const handleAttributeChange = (e) => {
    const value = e.target.value;
    const updatedSelectedAttributes = selectedAttributes.includes(value) 
      ? selectedAttributes.filter(attribute => attribute !== value) 
      : [...selectedAttributes, value];

    setSelectedAttributes(updatedSelectedAttributes);
  }

  return (
    <div className="h-screen">
      {loading ? (
        <h1>Loading...</h1>
      ) : Array.isArray(stats) && stats.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Game_ID</th> 
              {selectedAttributes.map((attribute, index) => (
                <th key={index}>{attribute}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, index) => {
              console.log('Individual stat object:', stat);
              return (
                <tr key={index}>
                  <td>{stat.game_id}</td> 
                  {selectedAttributes.map((attribute, innerIndex) => (
                    <td key={innerIndex}>{stat[attribute.toLowerCase()]}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <h1>No data to display</h1>
      )}

      <form>
        
        {attributes.filter(attr => attr !== "Game_ID").map((attribute, index) => (
          <div key={index}>
            <label>
              <input 
                type="checkbox"
                value={attribute}
                onChange={handleAttributeChange}
              />
              {attribute}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default GameStatsProjection;
