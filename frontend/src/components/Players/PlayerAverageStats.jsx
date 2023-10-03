import React, { useEffect, useState } from "react";
import { playerAverageStatsURL } from "../../api/players";
import { API } from "../../api";

const TableRow = ({ row, colnames }) => {
  const colors = ["bg-white", "bg-gray-100"];
  const tableCells = colnames.map((colname, idx) => {
    return (
      <td
        className={`whitespace-nowrap px-6 py-4 ${colors[idx % 2]}`}
        key={idx}
      >
        {row[colname]}
      </td>
    );
  });

  return <tr className="border-b dark:border-neutral-500">{tableCells}</tr>;
};

const PlayerAverageStats = ({ loading, setLoading }) => {
  const [stats, setStats] = useState([]);
  const [colnames, setColnames] = useState([]);

  useEffect(() => {
    API.get(playerAverageStatsURL).then((res) => {
      setStats(res?.data?.rows);
      setColnames(res?.data?.colnames);
      console.log(res?.data?.rows);
      console.log(res?.data?.colnames);
      setLoading(false);
    });
  }, [loading,setLoading]);

  const headCells = colnames?.map((colname) => {
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
  const tableRows = stats.map((row, idx) => (
    <TableRow key={idx} row={row} colnames={colnames} />
  ));
  let content;
  if (loading) {
    content = <h1>LOADING</h1>;
  } else {
    content = (
      <div className="items-center relative ">
        <div className="flex flex-col overflow-x-auto">
          <div className="sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full h-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
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
  }
  return <>{content}</>;
};

export default PlayerAverageStats;
