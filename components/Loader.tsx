import React from "react";
import BarLoader from "react-spinners/BarLoader";
import { CgSearchLoading } from "react-icons/cg";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full my-20">
      <h3 className="text-secondary mx-2 font-semibold text-lg"></h3>
      <CgSearchLoading className="text-secondary mx-2 text-4xl" />
      <BarLoader color="#E9498C" />
    </div>
  );
};

export default Loader;
