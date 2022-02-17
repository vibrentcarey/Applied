import React from "react";
import { SiIndeed, SiLinkedin } from "react-icons/si";
const Jobs = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full ">
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
            <td>
              <select className="select select-xs max-w-xs select-primary">
                <option disabled selected>
                  Status
                </option>
                <option>Pending</option>
                <option>Not Accepted</option>
                <option>Interview</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td className="text-primary">
              <SiLinkedin />
            </td>
            <td>12/5/2020</td>
            <td>
              <select className="select select-xs max-w-xs select-primary">
                <option disabled selected>
                  Status
                </option>
                <option>Pending</option>
                <option>Not Accepted</option>
                <option>Interview</option>
              </select>
            </td>
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
  );
};

export default Jobs;
