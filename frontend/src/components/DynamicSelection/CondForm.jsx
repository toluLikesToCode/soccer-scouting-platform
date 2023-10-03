import React from "react";

const CondForm = ({selections, setSelections,options}) => {

  return (
    <div>
      {options?.map((option) => (
        <div className="block w-1/2 h-8 bg-gray-500 my-5 mb-10 m-auto" key={option}>
          <label className="my-5" htmlFor={option}>
            {option} 
          </label>
          <input
            id={option}
            type="text"
            className="w-4/5  px-2 mx-5 my-4 "
            onChange={(e) =>
              setSelections({ ...selections, [option]: e.target.value })
            }
          />
        </div>
      ))}
    </div>
  );
};

export default CondForm;
