import React from "react";

const Header = () => {
  return (
    <div className="navbar bg-primary shadow-xl rounded-b-sm">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">Applied</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle"></button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator"></div>
        </button>
      </div>
    </div>
  );
};

export default Header;
