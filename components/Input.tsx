import React from "react";
interface InputProps {
  type?: string;
  label?: string;
  value: string;
  error?: string | false | undefined;
  id: string;
  placeholder: string;
  handleBlur: (e: React.ChangeEvent<any>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
}

const Input = ({
  type,
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
      <label htmlFor={id}>
        <span className="label-text">{label}</span>
      </label>

      <div>
        <input
          type={type}
          placeholder={placeholder}
          className="input input-bordered input-primary input-sm text-lg w-full max-w-xs"
          value={value}
          onChange={handleChange}
          id={id}
          onBlur={handleBlur}
        />
        {/* Error Message */}
        {error && <small className="p-1 text-red-600">{error}</small>}
      </div>
      </>
  );
};

export default Input;
