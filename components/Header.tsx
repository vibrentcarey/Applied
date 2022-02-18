import React from "react";
import { MdLibraryAdd, MdTableChart, MdOutlineLogout } from "react-icons/md";
import { signOut } from "next-auth/client";
import Link from "next/link";

const Header = () => {
  const confirmLogout = () => {
    signOut();
  };
  return (
    <div className="navbar bg-primary shadow-xl rounded-b-sm">
      <div className="navbar-start">
        <Link href="/" passHref>
          <button className="btn btn-ghost normal-case text-xl">Applied</button>
        </Link>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end">
        <Link href="/add" passHref>
          <button className="btn btn-ghost text-2xl">
            <MdLibraryAdd />
          </button>
        </Link>
        <Link href="/jobs" passHref>
          <button className="btn btn-ghost text-2xl">
            <MdTableChart />
          </button>
        </Link>
        <button className="btn btn-ghost text-2xl" onClick={confirmLogout}>
          <MdOutlineLogout />
        </button>
      </div>
    </div>
  );
};

export default Header;
