import React from "react";

const FormInput = ({
  type,
  label,
  id,
  handleChange,
  value,
  placeholder,
  required,
  colname,
}) => {
  return (
    <>
      <div className="shadow-md w-full h-24 block">
        <label
          htmlFor={id}
          className="block mb-4 mt-4 text-sm font-medium text-gray-900 uppercase"
        >
          {label}
        </label>
        <input
          type={type}
          id={id}
          required={required}
          min={type === "number" ? 0 : ""}
          value={value}
          step={type === "number" ? "any" : "null"}
          className="bg-gray-50 border block border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-4/5 p-2.5"
          placeholder={placeholder}
          onChange={(e) => handleChange(colname, e.target.value)}
        />
      </div>
    </>
  );
};

export default FormInput;
