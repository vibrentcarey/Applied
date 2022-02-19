import React from "react";
import Link from "next/link";

const EmptyJobs = () => {
  return (
    <p className="text-center m-4">
      Nothing here -
      <button className="link link-primary">
        <Link href="/add">Add Application</Link>
      </button>
    </p>
  );
};

export default EmptyJobs;
