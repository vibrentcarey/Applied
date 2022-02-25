import React, { useEffect, useReducer, useState } from "react";
import { getSession, GetSessionOptions } from "next-auth/client";
import { signIn } from "next-auth/client";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import axios from "axios";
import Alert from "../components/Alert";
import Input from "../components/Input";
import {Session} from '../models/session'
import { AlertState } from "../models/alert";

const Auth = ({ session }: Session) => {
  const [loginMode, setLoginMode] = useState(true);
  const initialAlertState = {
    showAlert: false,
    alertType: "",
    alertMessage: "",
  };

  const alertReducer = (state: AlertState, action) => {
    switch (action.type) {
      case "success":
        return {
          ...state,
          showAlert: true,
          alertType: "alert-success",
          alertMessage: action.message,
        };
    }
  };

  const [alertState, dispatch] = useReducer(alertReducer, initialAlertState);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(7, "Must be at least 7 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      if (loginMode) {
        login(values.email, values.password)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      } else {
        signUp(values.email, values.password);
      }
    },
  });

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session]);

  async function login(email: string, password: string) {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log(result);
    } catch (err) {
      console.log(err.message);
    }
    router.replace("/");
  }

  async function signUp(email: string, password: string) {
    try {
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
      });
      dispatch({ type: "success", message: response.data });
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="flex-col hero-content lg:flex-row-reverse z-10">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl text-primary font-bold">Applied</h1>
          <p className="py-6">
            Once you are logged in you can begin tracking all of your job
            applications in one convenient place.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mb-20 z-10">
          <form onSubmit={formik.handleSubmit} className="card-body z-10">
            <header className="prose">
              {alertState && alertState.showAlert && (
                <Alert
                  type={alertState.alertType}
                  message={alertState.alertMessage}
                />
              )}
              <h2>{loginMode ? "Login" : "Sign Up"} Now!</h2>
            </header>
            <Input
              label="Email"
              value={formik.values.email}
              handleChange={formik.handleChange}
              id="email"
              placeholder="Enter your email"
              handleBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
            />
            <Input
              type="password"
              label="Password"
              value={formik.values.password}
              handleChange={formik.handleChange}
              id="password"
              placeholder="Enter your password"
              handleBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
            />
            <div className="form-control mt-6">
              <button className="btn btn-primary btn-sm" type="submit">
                {loginMode ? "Login" : "Sign Up"}
              </button>
            </div>
          </form>
          {loginMode && (
            <div className="m-4">
              <h3>
                New Here?{" "}
                <span
                  className="link link-primary font-bold hover:cursor-pointer"
                  onClick={() => setLoginMode(false)}
                >
                  Sign Up
                </span>
              </h3>
            </div>
          )}
          {!loginMode && (
            <div className="m-4">
              <h3>
                Returning?{" "}
                <span
                  className="link link-primary font-bold hover:cursor-pointer"
                  onClick={() => setLoginMode(true)}
                >
                  Login
                </span>
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;

export async function getServerSideProps(ctx: GetSessionOptions) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
