
import React, { useState } from "react";
import DeletePlayerForm from './DeletePlayerForm';
import GamesWherePlayerScored from './GamesWherePlayerScored';
import PlayersWhoScoredInEveryGame from './PlayersWhoScoredInEveryGame';
import { ImFilter } from "react-icons/im";
import { Button, Modal } from "flowbite-react";
import PlayerStatsTable from "./PlayerStatsTable";

import PlayerStatsFilter from "./PlayerStatsFilter";
import PlayerAverageStats from "./PlayerAverageStats";


const PlayerStats = () => {
  const [playerStats, setPlayerStats] = useState([]);
  const [colnames, setColnames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  let modalContent = (
    <PlayerStatsFilter
      setColnames={setColnames}
      setLoading={setLoading}
      setPlayerStats={setPlayerStats}
      setOpenModal={setOpenModal}
    />
  );
  let content;
  if (loading) {
    content = (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    content = (
      <div className="inline-block max-w-full mt-10 h-full">
        <hr/>
      <h1 className="uppercase text-center text-3xl text-blue-700 mx-10 p-10">Players Game Statistics</h1>
      <hr/>
        <button
          onClick={() => setOpenModal(true)}
          type="button"
          className="inline-flex rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] bg-blue-700 outline-blue-300 transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          <ImFilter /> <h1 className="text-white">FILTER</h1>
        </button>
        <Modal
          show={openModal}
          size="md"
          popup
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header className="font-3xl text-center">
            <span className="uppercase text-center mx-5 text-blue-700 font-extrabold">
              Joined Statistics
            </span>
          </Modal.Header>
          <Modal.Body>{modalContent}</Modal.Body>
          <Modal.Footer className="inline-flex">
            <Button
              color="gray"
              className={"text-white bg-red-700 mx-8 p-4 h-12"}
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        {playerStats.length > 0 ? (
          <PlayerStatsTable
            rows={playerStats}
            colnames={colnames}
            setOpenModal={setOpenModal}
            openModal={openModal}
          />
        ) : (
          <h1 className=" justify-center text-center mx-10 p-10 m-auto text-blue-700 font-sans">
            Nothing to display. Please select more filters.
          </h1>
        )}
      </div>
    );
  }
  return (
    <div className={"w-full h-screen m-auto items-center justify-center"}>
      <h3>Delete Player: </h3><DeletePlayerForm />
      <h3>Find all the games that a player scored: </h3><GamesWherePlayerScored />
      <h3>Find the players who scored in all games: </h3><PlayersWhoScoredInEveryGame />
      <div className="block mt-10">{content}</div>
      <hr/>
      <h1 className="uppercase text-center text-3xl text-blue-700 mx-10">Average Statistics for the top 50 scorers</h1>
      <hr/>
      <div className="block">
        {<PlayerAverageStats loading={loading} setLoading={setLoading} />}
      </div>{" "}
    </div>
  );
};


export default PlayerStats;
