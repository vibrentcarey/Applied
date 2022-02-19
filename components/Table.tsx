import React from "react";
import TableRow from "./TableRow";
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

const Table = ({habits, confirmEdit, confirmDelete}) => {
  console.log(habits)
  return (
    <div className="overflow-x-auto flex flex-col ">
      <table className="table table-compact w-full bg-base-100 mt-8">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.length > 0 &&
            habits.map((habit, i) => (
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
