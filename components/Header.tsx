import React from "react";
import {MdLibraryAdd, MdTableChart, MdOutlineLogout} from 'react-icons/md'
import { signOut } from "next-auth/client";

const Header = () => {
  const confirmLogout = () => {
    signOut();
  }
  return (
    <div className="navbar bg-primary shadow-xl rounded-b-sm">
      <div className="navbar-start">
      <a className="btn btn-ghost normal-case text-xl">Applied</a>
      </div>
      <div className="navbar-center">
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost text-2xl"><MdLibraryAdd/></button>
        <button className="btn btn-ghost text-2xl"><MdTableChart/></button>
        <button className="btn btn-ghost text-2xl" onClick={confirmLogout}><MdOutlineLogout/></button>

      </div>
    </div>
  );
};

export default Header;
