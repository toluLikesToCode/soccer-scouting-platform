import React, { useState, useEffect } from 'react';
import { API } from "../../api";
import { getSelectionResutlsURL } from '../../api/players';

const SelectionQuery = () => {
  const [selectedTable, setSelectedTable] = useState('PlayerBirthInfo');
  const [conditions, setConditions] = useState({});
  const [results, setResults] = useState([]);

  const tablesWithAttributes = {
    PlayerBirthInfo: ['birthdate','age'],
    PlayerGeneralInfo: ['First_name', 'Last_name', 'Number', 'Height', 'Weight', 'Position', 
        'Active_Foot', 'Nationality', 'AgentID', 'clubID', 'teamID','birthdate'],
    Goalkeeper: ['Player_ID', 'Throwing_arm'],
    ClubIdentity: ['Name', 'Nickname', 'Team_color'],
    ClubMainInfo: ['Owner', 'Founded', 'Website', 'City', 'Name'],
    Team: ['Club_ID', 'Age_group', 'Players_ID', 'Coach_Manager', 'League_ID'],
    League: ['ID', 'Country', 'Name', 'Num_teams', 'Num_relegations', 'Num_promotions', 
        'Num_continental_competition_spots', 'Domestic_Cups_rules', 'International_Cups_rules', 
        'Confederation', 'Founded', 'Organizing_body', 'Current_Champion', 'Most_Championships', 
        'TV_partners', 'Website', 'Level_on_Pyramid', 'Relegation_to', 'Promotion_to'],
    Staff: ['ID', 'First_name', 'Last_name', 'Club_ID', 'Position', 'Nationality', 
        'Playing_career_position', 'Past_clubs', 'Contract'],
    Manager: ['Staff_ID', 'Preferred_formation'],
    Stadium: ['ID', 'Location', 'Name', 'Seats_capacity'],
    InjuryTypeInfo: ['injury_type', 'recovery_time'],
    PlayerInjuries: ['injury_id', 'player_id', 'injury_date', 'injury_type'],
  };

  useEffect(() => {
    // Reset conditions to '=' for all attributes of the selected table
    const defaultConditions = {};
    tablesWithAttributes[selectedTable].forEach(attribute => {
      defaultConditions[attribute] = { condition: '=', value: '' };
    });
    setConditions(defaultConditions);
  }, [selectedTable]); // <-- This effect runs every time selectedTable changes

  const handleConditionChange = (attribute, condition) => {
    setConditions({
      ...conditions,
      [attribute]: { ...conditions[attribute], condition },
    });
  };

  const handleValueChange = (attribute, value) => {
    setConditions({
      ...conditions,
      [attribute]: { ...conditions[attribute], value },
    });
  };

  const handleSubmit = async () => {
    // Filter out attributes with blank or undefined values
    const validConditions = Object.entries(conditions).filter(
      ([key, { value }]) => value && value.trim() !== ''
    );

    const conditionStrings = validConditions.map(
      ([key, { value, condition }]) => `${key} ${condition} '${value}'`
    );

    console.log("Valid Conditions:", validConditions);
    const queryString = `SELECT * FROM ${selectedTable} WHERE ${conditionStrings.join(' AND ')}`;
    const url = getSelectionResutlsURL() + `?query=${encodeURIComponent(queryString)}`;
    console.log("Constructed URL:", url);
    const response = await API.get(url); 
    console.log(JSON.stringify(response,null,2));
    setResults(response.data.data);
  };



  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label>Select Table: </label>
        <select
          onChange={(e) => setSelectedTable(e.target.value)}
          style={{ marginLeft: '10px' }}
        >
          {Object.keys(tablesWithAttributes).map((table) => (
            <option key={table} value={table}>
              {table}
            </option>
          ))}
        </select>
      </div>

      {selectedTable &&
        <div style={{ marginBottom: '20px' }}>
          {tablesWithAttributes[selectedTable].map((attribute) => (
            <div key={attribute} style={{ marginBottom: '10px' }}>
              <label>{attribute}: </label>
              <select
                onChange={(e) => handleConditionChange(attribute, e.target.value)}
                style={{ marginLeft: '10px', marginRight: '10px' }}
              >
                <option value="=">=</option>
                <option value=">">{'>'}</option>
                <option value="<">{'<'}</option>
              </select>
              <input
                type="text"
                onChange={(e) => handleValueChange(attribute, e.target.value)}
                style={{ padding: '5px' }}
              />
            </div>
          ))}
        </div>
      }

      <button onClick={handleSubmit} style={{ padding: '10px 20px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Submit
      </button>

      <div>
        <h2>Results:</h2>
        {results.length > 0 && (
          <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
            <thead>
              <tr>
                {Object.keys(results[0]).map((key) => (
                  <th key={key} style={{ border: '1px solid black', padding: '8px', textAlign: 'left' }}>
                    {key.replace("_", " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  {Object.values(result).map((value, i) => (
                    <td key={i} style={{ border: '1px solid black', padding: '8px' }}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

};

export default SelectionQuery;
