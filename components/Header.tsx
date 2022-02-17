import React from "react";
import {MdLibraryAdd, MdTableChart} from 'react-icons/md'

const Header = () => {
  return (
    <div className="navbar bg-primary shadow-xl rounded-b-sm">
      <div className="navbar-start">
      <a className="btn btn-ghost normal-case text-xl">Applied</a>
      </div>
      <div className="navbar-center">
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost text-2xl"><MdLibraryAdd/></button>
        <button className="btn btn-ghost text-2xl"><MdTableChart/>
        </button>
      </div>
    </div>
  );
};

export default Header;
