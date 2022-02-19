import React from "react";

const Input = ({label, handleChange, value, handleBlur, error, id, placeholder}) => {
  console.log(id)
  return (
    <>
      <label htmlFor={id}>{label}</label>

      <div>
        <input
          type="text"
          placeholder={placeholder}
          className="input input-bordered input-primary input-sm text-lg w-full max-w-xs"
          value={value}
          onChange={handleChange}
          id={id}
          onBlur={handleBlur}
        />
        <small className="p-1 text-red-600">{error}</small>
      </div>
    </>
  );
};

export default Input;
