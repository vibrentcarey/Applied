import React from "react";
interface InputProps {
  label: string;
  value: string;
  error: string;
  id: string;
  placeholder: string;
  handleBlur: () => void;
  handleChange: () => void;
}

const Input = ({
  label,
  value,
  error,
  id,
  placeholder,
  handleBlur,
  handleChange,
}: InputProps) => {
  return (
    <>
      {/* Input With Label */}
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
        {/* Error Message */}
        <small className="p-1 text-red-600">{error}</small>
      </div>
    </>
  );
};

export default Input;
