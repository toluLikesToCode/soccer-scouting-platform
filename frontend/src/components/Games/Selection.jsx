import React from "react";

const Selection = ({
  label,
  htmlFor,
  id,
  name,
  options,
  handleChange,
  colname,
}) => {
  const augmentedOptions = [...options,"----"]
  const selectionOptions = augmentedOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));
  return (
    <div className="form-group mb-4 shadow-lg border-2  w-full my-10 py-5">
      <label htmlFor={htmlFor} className="block font-semibold mb-1">
        {label}
      </label>
      <select
        id={id}
        name={name}
        className="w-full py-2 px-4 border border-gray-300 rounded-md"
        onChange={(e) => handleChange(colname, e.target.value)}
      >
        {selectionOptions}
      </select>
    </div>
  );
};
export default Selection;