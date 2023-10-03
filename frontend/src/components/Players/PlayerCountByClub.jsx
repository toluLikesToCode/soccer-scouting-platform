import React, { useState } from 'react';
import { getPlayerCountByClubURL } from "../../api/players";
import { API } from "../../api";

function PlayerCountByClub() {
    const [data, setData] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const fetchData = async () => {
        try {
            const response = await API.get(getPlayerCountByClubURL());
            console.log(JSON.stringify(response.data, null, 2)); // TODO: remove before submitting
            setData(response.data.data);
            setShowTable(true);
        } catch (err) {
            console.error("An error occurred while fetching data:", err);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <button 
                onClick={fetchData} 
                style={{ padding: '10px 20px', marginBottom: '20px', cursor: 'pointer', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}
            >
                Get Player Count by Club
            </button>
            {showTable && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #000' }}>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Club</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Number of Players</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.clubid} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '10px' }}>{item.clubid}</td>
                                <td style={{ padding: '10px' }}>{item.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default PlayerCountByClub;