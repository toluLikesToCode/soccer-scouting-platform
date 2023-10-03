import React from "react";

const AttributesForm = ({ options, selections, setSelections }) => {
  return (
    <div>
      <div className="block w-1/2 justify-center items-center">
        <label htmlFor={"table"} className="block font-semibold mb-1">
          Select a Table
        </label>
        <select
          multiple
        
          id={"table"}
          name={"table"}
          className="w-full h-36 py-2 px-4 border border-gray-300 rounded-md"
          onChange={(e) => setSelections([...selections, e.target.value])}
        >
          {options?.map((name) => (
            <option className={` text-white h-6 px-10 ${selections.includes(name)? 'bg-blue-400' :'bg-gray-500'}`} key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AttributesForm;
