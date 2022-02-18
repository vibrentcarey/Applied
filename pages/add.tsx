import React from "react";


const Add = () => {
  return (
    <section className=" w-full h-full flex flex-col items-center ">
       <h1 className="mt-8 text-center text-4xl font-bold">Add Job</h1>
      <form className="card w-full bg-base-100 shadow-xl mt-8 mb-20 border max-w-sm">
        <div className="card-body prose">
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

          <label htmlFor="start">Link:</label>
          <input
            type="text"
            placeholder="Enter job url"
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
      </form>
    </section>
  );
};

export default Add;
