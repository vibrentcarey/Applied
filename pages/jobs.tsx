import React, { useEffect, useState } from "react";
import axios from "axios";
import { SiIndeed, SiLinkedin } from "react-icons/si";
import { HiExternalLink } from "react-icons/hi";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import  BarLoader  from "react-spinners/BarLoader";
import BounceLoader from 'react-spinners/BounceLoader'
import PuffLoader from 'react-spinners/PuffLoader'
import RiseLoader from 'react-spinners/RiseLoader'

const Jobs = ({ session }) => {
  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  const router = useRouter();

  const loadData = async (email) => {
    setLoading(true)
    setTimeout(async() => {
      try {
        const response = await axios.get(`/api/handlers?user=${email}`);
        setHabits(response.data.message);
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    }, 3000)}
  
  console.log(habits);
  useEffect(() => {
    if (session) {
      loadData(session.user.email);
    } else {
      router.replace("/auth");
    }
  }, [session, router]);

  const textToLogo = (text) => {
    console.log(text);
    if (text === "indeed") {
      return (
        <td className="text-primary">
          <SiIndeed />
        </td>
      );
    } else if (text === "linkedin") {
      return (
        <td className="text-primary">
          <SiLinkedin />
        </td>
      );
    } else {
      return <td>{text}</td>;
    }
  };
  return (
    <div className="">
      <h1 className="mt-8 text-center text-4xl font-bold text-primary">Your Applications</h1>
      {loading ? <div className="flex justify-center w-full my-20"><h3 className="text-secondary mx-2 font-semibold text-lg">Loading</h3><RiseLoader color='#E9498C'/> </div>:
      <div className="overflow-x-auto flex flex-col ">
        <table className="table table-compact w-full bg-base-100 mt-8">
          <thead>
            <tr>
              <th></th>
              <th>Job</th>
              <th>company</th>
              <th>Platform</th>
              <th>Date Applied</th>
              <th>Link</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>

            { habits &&
              habits.map((habit, i) => (
                <tr key={habit}>
                  <th>{i + 1}</th>
                  <td>{habit.job}</td>
                  <td>{habit.company}</td>
                  {textToLogo(habit.platform)}
                  <td>12/16/2020</td>
                  <td>
                    <a href="">
                      <HiExternalLink className="text-secondary text-lg" />
                    </a>
                  </td>
                  <td className="text-primary">Pending</td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Job</th>
              <th>company</th>
              <th>Platform</th>
              <th>Date Applied</th>
              <th>Link</th>
              <th>Status</th>
            </tr>
          </tfoot>
        </table>
      </div>
}
    </div>
  );
};

export default Jobs;

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
