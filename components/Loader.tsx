import React from "react";
import RiseLoader from "react-spinners/RiseLoader";
import { CgSearchLoading } from "react-icons/cg";

const Loader = () => {
  return (
    <div className="flex justify-center w-full my-20">
      <h3 className="text-secondary mx-2 font-semibold text-lg"></h3>
      <CgSearchLoading className="text-secondary mx-2 text-4xl" />
      <RiseLoader color="#E9498C" />
    </div>
  );
};

export default Loader;
