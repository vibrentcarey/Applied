import React from "react";
import TableRow from "./TableRow";

interface Habit {
  id: string;
  job: string;
  company: string;
  date: string;
  link: string;
  status: string;
  platform: string;
}

interface TableProps {
  habits: Habit[];
  confirmEdit: (id: string) => void;
  confirmDelete: (id: string) => void;
}

const tableHeaders = [
  "",
  "job",
  "company",
  "platform",
  "date applied",
  "link",
  "status",
  "edit",
  "delete",
];

const Table = ({ habits, confirmEdit, confirmDelete }: TableProps) => {
  return (
    <div className="overflow-x-auto flex flex-col z-10">
      <table className="table table-compact w-full bg-base-100 z-10">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.length > 0 &&
            habits.map((habit: Habit, i: number) => (
              <TableRow
                key={habit.link + i}
                habit={habit}
                i={i}
                confirmDelete={confirmDelete}
                confirmEdit={confirmEdit}
              />
            ))}
        </tbody>
        <tfoot>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
