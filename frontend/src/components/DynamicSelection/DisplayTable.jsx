import React, { useState } from "react";

const TableRow = ({ row, colnames }) => {
  const serializedGame = encodeURIComponent(JSON.stringify(row));
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

const DisplayTable = ({ rows, colnames }) => {
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
  headCells.push(
    <th scope="col" className="px-6 py-4">
      Actions
    </th>
  );
  const tableRows = rows.map((row, idx) => (
    <TableRow key={idx} row={row} colnames={colnames} />
  ));

  return (
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
};

export default DisplayTable;
