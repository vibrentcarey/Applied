import React from "react";
interface AlertProps {
  type: string;
  message: string;
}

const Alert = ({ type, message }: AlertProps) => {
  return (
    <div className={`alert shadow-lg ${type}`}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-lineCap="round"
            stroke-lineJoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-xs">{message}</span>
      </div>
    </div>
  );
};

export default Alert;
