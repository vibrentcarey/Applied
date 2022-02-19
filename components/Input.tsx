import React from "react";
interface InputProps {
  label: string;
  value: string;
  error: string | false | undefined;
  id: string;
  placeholder: string;
  handleBlur: (e: React.ChangeEvent<any>) => void;
  handleChange: (e: React.ChangeEvent<any>) => void;
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
    <div className="form-control">
      {/* Input With Label */}
      <label htmlFor={id} className="label">
        <span className="label-text">{label}</span>
      </label>

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
    </div>
  );
};

export default Input;
