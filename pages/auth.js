import React, { useEffect, useState } from 'react';
import { getSession } from "next-auth/client"
import { signIn } from 'next-auth/client'
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup'
import axios from 'axios';


const Auth = ({ session }) => {
  const [loginMode, setLoginMode] = useState(false)
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required("Email is required"),
      password: Yup.string()
        .min(7, "Must be at least 7 characters")
        .required("Password is required"),
    }),
    onSubmit: values => {
      if (loginMode) {
        login(values.email, values.password)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      } else {
        signUp(values.email, values.password)
      }
    }
  })

  useEffect(() => {
    if (session) {
      router.replace('/')
    }
  }, [session, router])

  async function login(email, password) {
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password
    })
    router.replace('/');
  }

  async function signUp(email, password) {
    const response = await axios.post('/api/auth/signup', { email, password })
    console.log(response)
    router.replace('/')
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="flex-col hero-content lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">{loginMode ? 'Login' : 'Sign Up'} Now!</h1>
          <p className="py-6">Once you are logged in you can begin tracking all of your job applications in one convenient place.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={formik.handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                className="input input-bordered input-primary input-sm"
                value={formik.values.email}
                onChange={formik.handleChange}
                id="email"
                placeholder="Enter your email"
                onBlur={formik.handleBlur}
              />
              <p>{formik.touched.email && formik.errors.email}</p>

            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" value={formik.values.password}
                onChange={formik.handleChange}
                id="password"
                placeholder="Enter your password"
                error={formik.touched.password && formik.errors.password}
                onBlur={formik.handleBlur} className="input input-bordered input-primary input-sm" />
              <p>{formik.touched.password && formik.errors.password}</p>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary btn-sm" type='submit'>{loginMode ? 'Login' : 'Sign Up'}</button>
            </div>
          </form>
          {loginMode && <><h3>New Here? <span className='text-purple-500 font-bold hover:cursor-pointer' onClick={() => setLoginMode(false)}>Sign Up</span></h3></>}
        {!loginMode && <><h3>Returning? <span className='text-purple-500 font-bold hover:cursor-pointer' onClick={() => setLoginMode(true)}>Login</span></h3></>}
        </div>
      </div>
    </div>
  );
};

export default Auth;

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}