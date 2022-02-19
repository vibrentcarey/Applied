import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";
import { textToLogo } from "../utils/helpers";

interface Habit {
  id: string;
  job: string;
  company: string;
  date: string;
  link: string;
  status: string;
  platform: string;
}
interface TableRowProps {
  habit: Habit;
  i: number;
  confirmEdit: (id: string) => void;
  confirmDelete: (id: string) => void;
}

const TableRow = ({ habit, i, confirmEdit, confirmDelete }: TableRowProps) => {
  return (
    <tr key={habit.id}>
      <th>{i + 1}</th>
      <td className="capitalize">{habit.job}</td>
      <td className="capitalize">{habit.company}</td>
      {textToLogo(habit.platform)}
      <td>{habit.date}</td>
      {/* Link Button */}
      <td>
        <a href={habit.link} target="_blank" rel="noreferrer">
          <HiExternalLink className="text-secondary text-lg" />
        </a>
      </td>
      {/* Set Colour Based On Status */}
      <td
        className={`${
          habit.status === "pending" ? "text-primary" : "text-secondary"
        } ${habit.status === "interview" && "text-green-500"} capitalize`}
      >
        {habit.status}
      </td>
      {/* Edit Button */}
      <td>
        <FaEdit
          className="hover:cursor-pointer"
          onClick={() => confirmEdit(habit.id)}
        />
      </td>
      {/* Delete Button */}
      <td>
        <FaTrashAlt
          className="hover:cursor-pointer"
          onClick={() => confirmDelete(habit.id)}
        />
      </td>
    </tr>
  );
};

export default TableRow;
