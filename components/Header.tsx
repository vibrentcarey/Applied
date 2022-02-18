import React, { useEffect } from "react";

import { MdLibraryAdd, MdTableChart, MdOutlineLogout, MdLock } from "react-icons/md";
import { signOut } from "next-auth/client";
import Link from "next/link";
import { useSession } from "next-auth/client";


const Header = () => {
  const [session, loading] = useSession();

  const confirmLogout = () => {
    signOut();
  };
  return (
    <div className="navbar bg-neutral text-primary shadow-xl rounded-b-sm ">
      <div className="navbar-start">
        <Link href="/" passHref>
          <button className="btn btn-ghost normal-case text-xl">Applied</button>
        </Link>
      </div>
      <div className="navbar-center"></div>
      <div className="navbar-end">
        {session ? (
          <>
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
          </>
        ) : (
          <MdLock className="text-2xl mr-8 sm:mr-12"/>
        )}
      </div>
    </div>
  );
};

export default Header;
