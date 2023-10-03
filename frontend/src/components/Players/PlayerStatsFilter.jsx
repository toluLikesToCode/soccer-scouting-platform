import React, { useState } from "react";
import FormInput from "../Games/FormInput";
import Selection from "../Games/Selection";
import { playerStatsURL } from "../../api/players";
import { API } from "../../api";

const PlayerStatsFilter = ({
  setOpenModal,
  setLoading,
  setColnames,
  setPlayerStats,
}) => {
  const [filters, setFilters] = useState({});
  const handleChange = (colname, val) => {
    setFilters({ ...filters, [colname]: val });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Object.keys(filters));
    if (Object.keys(filters).length <= 0) {
      alert("Cannot send empty filters");
      setOpenModal(false);
      return;
    }
    setLoading(true);
    console.log(playerStatsURL);
    API.get(playerStatsURL, {
      params: { filters: JSON.stringify(filters) },
    }).then((res) => {
      const data = res?.data;
      setPlayerStats(data?.rows);
      setColnames(data?.colnames);
      setLoading(false);
      setFilters({});
      setOpenModal(false);
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          label={"Nationality"}
          id={"nationality"}
          colname={"p.Nationality"}
          handleChange={handleChange}
        />
        <FormInput
          type="text"
          label={"Position"}
          id={"position"}
          colname={"p.Position"}
          handleChange={handleChange}
        />
        <FormInput
          type="number"
          label={"Minutes Played"}
          id={"minutes"}
          colname={"s.Minutes_played"}
          handleChange={handleChange}
        />
        <FormInput
          type="number"
          label={"Goals"}
          colname={"s.Goals"}
          handleChange={handleChange}
        />
        <FormInput
          type="number"
          label={"Assists"}
          id={"Assists"}
          colname={"s.Assists"}
          handleChange={handleChange}
        />
        <FormInput
          type="number"
          label={"Shots On Goal"}
          id={"s.Shots_on_goal"}
          colname={"s.Shots_on_goal"}
          handleChange={handleChange}
        />
        <Selection
          label={"Active Foot"}
          htmlFor={"active_foot"}
          name={"Active Foot"}
          id={"active_foot"}
          options={["left", "right"]}
          setUpdates={setFilters}
          updates={filters}
          colname={"p.Active_foot"}
        />
        <input
          type="submit"
          className="submit-btn bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
        />
      </form>
    </div>
  );
};

export default PlayerStatsFilter;
