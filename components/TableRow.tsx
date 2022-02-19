import React from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";
import { SiIndeed, SiLinkedin, SiGlassdoor } from "react-icons/si";

 // Convert text to job logo
 const textToLogo = (text: string) => {
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
  } else if (text === "glassdoor") {
    return (
      <td className="text-primary">
        <SiGlassdoor />
      </td>
    );
  } else {
    return <td className="capitalize">{text}</td>;
  }
};

const TableRow = ({habit, i, confirmEdit, confirmDelete}) => {
  return (
    <tr key={habit}>
    <th>{i + 1}</th>
    <td className="capitalize">{habit.job}</td>
    <td className="capitalize">{habit.company}</td>
    {textToLogo(habit.platform)}
    <td>12/16/2020</td>
    <td>
      <a href={habit.link} target="_blank" rel="noreferrer">
        <HiExternalLink className="text-secondary text-lg" />
      </a>
    </td>
    <td
      className={`${
        habit.status === "pending"
          ? "text-primary"
          : "text-secondary"
      } ${
        habit.status === "interview" && "text-green-500"
      } capitalize`}
    >
      {habit.status}
    </td>
    <td>
      <FaEdit
        className="hover:cursor-pointer"
        onClick={() => confirmEdit(habit.id)}
      />
    </td>
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