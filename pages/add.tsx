import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";

const Add = ({ session }) => {
  const router = useRouter();

  const createHabit = async (data) => {
    console.log("trying");
    try {
      const response = await axios.post("/api/handlers", data);
      console.log(response);
      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (session) {
    } else {
      router.replace("/auth");
    }
  }, [session, router,]);

  const formik = useFormik({
    initialValues: {
      job: "",
      company: "",
      platform: "",
      link: "",
      date: "",
    },
    validationSchema: Yup.object({
      job: Yup.string()
        .min(3, "Must have 3 characters")
        .max(30, "Must be 20 characters or less")
        .required("Title is required"),
      company: Yup.string()
        .min(3, "Must have 3 characters")
        .max(30, "Must be 20 characters or less"),
      platform: Yup.string()
        .min(3, "Must have 3 characters")
        .max(30, "Must be 20 characters or less")
        .required("Reason is required"),
      link: Yup.string()
        .min(5, "Must have 5 characters")
        .required("Link is required"),
      // date: Yup.string().required("Resource title is required"),
    }),
    onSubmit: (values) => {
      console.log(formik.errors);
      const streakInfo = {
        job: values.job,
        company: values.company,
        platform: values.platform,
        link: values.link,
        date: values.date,
        user: session.user.email,
      };
      createHabit(streakInfo);
    },
  });
  return (
    <section className=" w-full h-full flex flex-col items-center ">
      <h1 className="mt-8 text-center text-4xl font-bold">Add Job</h1>
      <form
        className="card w-full bg-base-100 shadow-xl mt-8 mb-20 border max-w-sm"
        onSubmit={formik.handleSubmit}
      >
        <div className="card-body prose">
          <h2 className="card-title">Add Job Application</h2>
          <label htmlFor="start">Job:</label>
          <input
            type="text"
            placeholder="Enter job title"
            className="input input-bordered input-primary input-sm w-full max-w-xs"
            value={formik.values.job}
            onChange={formik.handleChange}
            id="job"
          />
          <label htmlFor="start">Company:</label>
          <input
            type="text"
            placeholder="Enter company name"
            className="input input-bordered input-primary input-sm w-full max-w-xs"
            value={formik.values.company}
            onChange={formik.handleChange}
            id="company"
          />

          <label htmlFor="start">Platform:</label>
          <input
            type="text"
            placeholder="Enter website name"
            className="input input-bordered input-primary input-sm w-full max-w-xs"
            value={formik.values.platform}
            onChange={formik.handleChange}
            id="platform"
          />

          <label htmlFor="start">Link:</label>
          <input
            type="text"
            placeholder="Enter job url"
            className="input input-bordered input-primary input-sm w-full max-w-xs"
            value={formik.values.link}
            onChange={formik.handleChange}
            id="link"
          />

          {/* <label htmlFor="start">Date Applied:</label>
          <input
            type="date"
            name="trip-start"
            className="outline outline-blue-300 rounded px-2"
            value={formik.values.date}
            onChange={formik.handleChange}
            id="date"
          ></input> */}
          <div className="justify-end card-actions">
            <button className="btn btn-primary btn-sm mt-4" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Add;

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
