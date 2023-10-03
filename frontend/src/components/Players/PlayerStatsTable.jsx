import React from "react";


const TableRow = ({ row, colnames }) => {
  const colors = ["bg-white", "bg-gray-100"];
  const tableCells = colnames.map((colname, idx) => (
    <td className={`whitespace-nowrap px-6 py-4 ${colors[idx % 2]}`} key={idx}>
      {row[colname]}
    </td>
  ));

  return <tr className="border-b dark:border-neutral-500">{tableCells}</tr>;
};

const PlayerStatsTable = ({ rows, colnames }) => {
  const headCells = colnames.map((colname) => {
    return (
      <th
        scope="col"
        className="px-6 py-4 text-white bg-slate-600 uppercase"
        key={colname}
      >
        {colname}
      </th>
    );
  });
  const tableRows = rows.map((row, idx) => (
    <TableRow key={idx} row={row} colnames={colnames} />
  ));
  return (
    <div>
      <div className="flex flex-col overflow-x-auto">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
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
};

export default PlayerStatsTable;
