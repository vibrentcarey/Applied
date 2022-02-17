import React from "react";

const Add = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl prose">
      <div className="card-body">
        <h2 className="card-title">Add Job Application</h2>
        <label htmlFor="start">Job:</label>
        <input
          type="text"
          placeholder="Enter job title"
          className="input input-bordered input-primary input-sm w-full max-w-xs"
        />
        <label htmlFor="start">Company:</label>
        <input
          type="text"
          placeholder="Enter company name"
          className="input input-bordered input-primary input-sm w-full max-w-xs"
        />

        <label htmlFor="start">Platform:</label>
        <input
          type="text"
          placeholder="Enter website name"
          className="input input-bordered input-primary input-sm w-full max-w-xs"
        />

        <label htmlFor="start">Date Applied:</label>
        <input
          type="date"
          id="start"
          name="trip-start"
          className="outline outline-blue-300 rounded px-2"
        ></input>
        <div className="justify-end card-actions">
          <button className="btn btn-primary btn-sm mt-4">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Add;
