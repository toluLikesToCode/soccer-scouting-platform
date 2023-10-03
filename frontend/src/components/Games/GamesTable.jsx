import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import GameDeleteForm from "./GameDeleteForm";
import { useNavigate } from "react-router-dom";

const TableRow = ({
  setDeleteModal,
  setSelectedGameId,
  row,
  colnames,
  getGoalScorers
}) => {
  const navigate = useNavigate()
  const serializedGame = encodeURIComponent(JSON.stringify(row));
  const handleUpdateClick = () => {
    navigate(`/games/update?game=${serializedGame}`)
   
  };
  const handleDeleteClick = () => {
    setSelectedGameId(row?.game_id);
    setDeleteModal(true);
  };
  const colors = ["bg-white", "bg-gray-100"];
  const tableCells = colnames.map((colname, idx) => {
    if (colname === "deletion") {
      return (
        <td className="whitespace-nowrap px-6 py-4" key={idx}>
          <button
            className="bg-white w-16 text-red-900"
            onClick={handleDeleteClick}
          >
            <RiDeleteBin5Line />
          </button>
        </td>
      );
    } else if (colname === "update") {
      return (
        <td className="whitespace-nowrap px-6 py-4" key={idx}>
          <button
            className="bg-white w-16 text-gray-700"
            onClick={handleUpdateClick}
          >
            <FiEdit />
          </button>
        </td>
      );
    } else {
      return (
        <td
          className={`whitespace-nowrap px-6 py-4 ${colors[idx % 2]}`}
          key={idx}
        >
          {row[colname]}
        </td>
      );
    }
  });

  return (
    <tr className="border-b dark:border-neutral-500">
      {tableCells}
      <td>

        <button onClick={() => getGoalScorers(row.game_id)}>View Goal Scorers</button>
      </td>
    </tr>
  );
};

const GamesTable = ({ rows, colnames, getGoalScorers  }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState(null);
  const navigate = useNavigate();


  const headCells = colnames.map((colname) => {
    return (
      <th
        scope="col"
        className="px-6 py-4 bg-gray-600 uppercase text-white"
        key={colname}
      >
        {colname}
      </th>
    );
  });
  // Adding an additional header for the goal scorers button column
  headCells.push(<th scope="col" className="px-6 py-4">Actions</th>);
  const tableRows = rows.map((row, idx) => (
    <TableRow
      setDeleteModal={setDeleteModal}
     
      setSelectedGameId={setSelectedGameId}
      key={idx}
      row={row}
      colnames={colnames}
      getGoalScorers={getGoalScorers}
    />
  ));

  const getTeamIDs = () => {
    const ids = [];
    for (const row of rows) {
      ids.push(row["homeclubid"]);
      ids.push(row["awayclubid"]);
    }
    return Array.from(new Set(ids));
  };
  const getStadiumIDs = () => {
    const ids = [];
    for (const row of rows) {
      ids.push(row["stadium_id"]);
    }
    return Array.from(new Set(ids));
  };
  const getLeagueIDs = () => {
    const ids = [];
    for (const row of rows) {
      ids.push(row["league_id"]);
    }

    return Array.from(new Set(ids));
  };
  const teams = getTeamIDs();
  const leagues = getLeagueIDs();
  const stadiums = getStadiumIDs();

  const encodedTeams = encodeURIComponent(JSON.stringify(teams));
  const encodedLeagues = encodeURIComponent(JSON.stringify(leagues));
  const encodedStadiums = encodeURIComponent(JSON.stringify(stadiums));

  return (
    <div className="items-center relative ">
      <button
        onClick={() => navigate(`/games/add?teams=${encodedTeams}&leagues=${encodedLeagues}&stadiums=${encodedStadiums}`)}
        type="button"
        className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase bg-blue-700 leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      >
        +ADD GAME
      </button>

      <div className="flex flex-col overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full h-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
             
              <GameDeleteForm
                openModal={deleteModal}
                setOpenModal={setDeleteModal}
                gameId={selectedGameId}
                teamIDs={teams}
                leagueIDs={leagues}
                stadiumIDs={stadiums}
              />
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>{headCells}</tr>
                </thead>
                <tbody>{tableRows}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesTable;
