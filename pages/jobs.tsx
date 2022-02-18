import React, {useEffect} from "react";
import { SiIndeed, SiLinkedin } from "react-icons/si";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";

const Jobs = ({session}) => {

  const router = useRouter();

  useEffect(() => {
    if (session) {
    } else {
      router.replace("/auth");
    }
  }, [session, router]);
  
  return (
    <div className="">
        <h1  className="my-8 text-center text-4xl font-bold">Your Jobs</h1>
      <div className="overflow-x-auto flex flex-col ">
        <table className="table table-compact w-full bg-base-100 mt-8">
          <thead>
            <tr>
              <th></th>
              <th>Job</th>
              <th>company</th>
              <th>Platform</th>
              <th>Date Applied</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td className="text-primary">
                <SiIndeed />
              </td>
              <td>12/16/2020</td>
              <td className="text-primary">Pending</td>
            </tr>
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td className="text-primary">
                <SiLinkedin />
              </td>
              <td>12/5/2020</td>
              <td className="text-secondary">Not Accepted</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Job</th>
              <th>company</th>
              <th>Platform</th>
              <th>Date Applied</th>
              <th>Status</th>
            </tr>
          </tfoot>
        </table>
      </div>
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