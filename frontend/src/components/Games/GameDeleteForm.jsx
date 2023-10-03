import React from "react";
import CustomModal from "../Modals/CustomModal";
import { API } from "../../api";
import { getGameDeletionURL } from "../../api/games";

const GameDeleteForm = ({
  openModal,
  setOpenModal,
  gameId,
  setSelectedGameId,
}) => {
  const deleteGame = () => {
    
    API.delete(getGameDeletionURL(gameId)).then((res) => {
      if (res?.data?.success) {
        setSelectedGameId(null);
        alert(res.data.message);
      }
    });
  };
  const content = (
    <div className="block">
      <h3 className="text-red-500">
        Are you sure you want to delete this game?
      </h3>
      <h4 className="text-gray-400">
        This action cannot be undone, make sure you know what you are doing
      </h4>
    </div>
  );
  return (
    <CustomModal
      openModal={openModal}
      setOpenModal={setOpenModal}
      actionFunc={deleteGame}
      content={content}
    />
  );
};

export default GameDeleteForm;
