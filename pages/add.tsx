import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import uuid from "react-uuid";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Input from "../components/Input";

interface Session {
  session: {
    user: {
      email: string;
      image: null;
      name: null;
    };
  };
}
interface Application {
  id: any,
  job: string,
  company: string,
  platform: string,
  otherPlatform?: string,
  link: string,
  date: string,
  user: string,
  status: string
}

const Add = ({ session }: Session) => {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const createHabit = async (data: Application) => {
    console.log("trying");
    try {
      const response = await axios.post("/api/handlers", data);
      console.log(response);
      router.replace("/jobs");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (session) {
    } else {
      router.replace("/auth");
    }
  }, [session, router]);

  const formatDate = (date: Date | null) => {
    if (date) {
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const day = date.getDate();
    return `${month}-${day}-${year}`;
    }
  };

  const formik = useFormik({
    initialValues: {
      job: "",
      company: "",
      platform: "indeed",
      otherPlatform: "",
      link: "",
      date: "",
    },
    validationSchema: Yup.object({
      job: Yup.string()
        .min(3, "Must have 3 characters")
        .max(30, "Must be 20 characters or less")
        .required("Job is required"),
      company: Yup.string()
        .min(3, "Must have 3 characters")
        .max(30, "Must be 20 characters or less")
        .required("Company is required"),
      platform: Yup.string()
        .min(3, "Must have 3 characters")
        .max(30, "Must be 20 characters or less")
        .required("Reason is required"),
      otherPlatform: Yup.string()
        .min(3, "Must have 3 characters")
        .max(30, "Must be 20 characters or less"),
      link: Yup.string()
        .min(5, "Must have 5 characters")
        .required("Link is required"),
    }),
  
    onSubmit: (values) => {
      formatDate(startDate);
      const streakInfo = {
        id: uuid(),
        job: values.job,
        company: values.company,
        platform: values.platform,
        otherPlatform: values.otherPlatform,
        link: values.link,
        date: formatDate(startDate),
        user: session.user.email,
        status: "pending",
      };
      createHabit(streakInfo);
    },
  });

  return (
    <section className="flex flex-col items-center ">
      <h1 className="mt-8 text-center text-4xl font-bold text-primary">
        Add Application
      </h1>
      <form
        className="card w-full bg-base-100 shadow-xl mt-8 mb-20 border max-w-xs md:max-w-sm"
        onSubmit={formik.handleSubmit}
      >
        <div className="card-body prose">
          <h2 className="card-title">Add Job Application</h2>
          {/* Job Input */}
          <Input
            label="Job:"
            handleChange={formik.handleChange}
            value={formik.values.job}
            handleBlur={formik.handleBlur}
            error={formik.touched.job && formik.errors.job}
            id="job"
            placeholder="Enter job title"
          />
          {/* Company Input */}
          <Input
            label="Company:"
            handleChange={formik.handleChange}
            value={formik.values.company}
            handleBlur={formik.handleBlur}
            error={formik.touched.company && formik.errors.company}
            id="company"
            placeholder="Enter company name"
          />
          {/* Platform Input */}
          <label htmlFor="start">Platform:</label>
          <select
            className="select select-sm max-w-xs select-primary"
            onChange={formik.handleChange}
            id="platform"
          >
            <option disabled>Hiring Platform</option>
            <option value="indeed">Indeed</option>
            <option value="linkedin">LinkedIn</option>
            <option value="glassdoor">Glassdoor</option>
            <option value="other">Other</option>
          </select>
          {formik.values.platform === "other" && (
            <Input
              id="otherPlatform"
              handleChange={formik.handleChange}
              placeholder="Please specify"
              handleBlur={formik.handleBlur}
            />
          )}
          {/* Link Input */}
          <Input
            label="Link:"
            handleChange={formik.handleChange}
            value={formik.values.link}
            handleBlur={formik.handleBlur}
            error={formik.touched.link && formik.errors.link}
            id="link"
            placeholder="Enter job url"
          />
          <label htmlFor="date">Date Applied:</label>
          {/* Date Input */}
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="input input-primary input-sm w-full text-lg"
            id="date"
          />
          {/* Submit Button */}
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
