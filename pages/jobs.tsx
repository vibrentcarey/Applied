import React, { ChangeEvent, useEffect, useState, useReducer } from "react";
import axios from "axios";
import { getSession, GetSessionOptions } from "next-auth/client";
import { useRouter } from "next/router";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import TableRow from "../components/TableRow";
import EmptyJobs from "../components/EmptyJobs";
interface Session {
  session: {
    user: {
      email: string;
      image: null;
      name: null;
    };
  };
}
interface ModalState {
  showModal: boolean;
  modalMessage: string;
  modalTitle: string;
  modalMode: string;
  modalId: string;
}
const Jobs = ({ session }: Session) => {
  // State values
  const [selectStatus, setSelectStatus] = useState("pending");
  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  // Initialize Router
  const router = useRouter();
  // Select status change
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectStatus(event.target.value);
  };
  // Load jobs from db
  useEffect(() => {
    if (session) {
      loadData(session.user.email);
    } else {
      router.replace("/auth");
    }
  }, [session, router]);

  // Modal State
  const initialModalState = {
    showModal: false,
    modalMessage: "",
    modalTitle: "",
    modalMode: "",
    modalId: "",
  };

  const modalReducer = (
    state: ModalState,
    action: { type: string; id?: string }
  ) => {
    switch (action.type) {
      case "edit":
        return {
          ...state,
          showModal: true,
          modalId: action.id,
          modalMode: "edit",
          modalTitle: "Edit Status",
          modalMessage: (
            <select
              className="select select-sm max-w-xs select-primary"
              onChange={handleChange}
              defaultValue={selectStatus}
            >
              <option disabled>Update Status</option>
              <option value="pending">Pending</option>
              <option value="not accepted">Not Accepted</option>
              <option value="interview">Interview</option>
            </select>
          ),
        };
      case "delete":
        return {
          ...state,
          showModal: true,
          modalId: action.id,
          modalMode: "delete",
          modalTitle: "Confirm Delete",
          modalMessage: "Are you sure you want to delete this job?",
        };
      case "close":
        return {
          ...state,
          showModal: false,
        };
    }
  };
  // UseReducer for modal
  const [modalState, dispatch] = useReducer(modalReducer, initialModalState);

  // Dispatch functions
  const confirmEdit = (id: string) => {
    dispatch({ type: "edit", id });
  };

  const confirmDelete = (id: string) => {
    dispatch({ type: "delete", id });
  };
  // Api call function
  const loadData = async (email: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/handlers?user=${email}`);
      setHabits(response.data.message);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    dispatch({ type: "close" });
  };
  // Api call functions
  const deleteJob = (id: string) => {
    axios
      .delete("/api/handlers", { data: { id, user: session.user.email } })
      .then((res) => {
        loadData(session.user.email);
        closeModal();
      });
  };

  const editJob = (id: string) => {
    axios
      .put("/api/handlers", {
        id,
        status: selectStatus,
        user: session.user.email,
      })
      .then((res) => {
        loadData(session.user.email);
        closeModal();
      });
  };

  const submit = (id: string) => {
    modalState.modalMode === "delete" ? deleteJob(id) : editJob(id);
  };
  // Headers
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

  return (
    <div className="">
      <Modal
        showModal={modalState.showModal}
        message={modalState.modalMessage}
        close={closeModal}
        confirm={submit}
        id={modalState.modalId}
        title={modalState.modalTitle}
      />
      <h1 className="mt-8 text-center text-4xl font-bold text-primary">
        Your Applications
      </h1>
      {loading ? (
        <Loader />
      ) : (
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
              {habits &&
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
      )}
      {habits.length === 0 && !loading && <EmptyJobs />}
    </div>
  );
};

export default Jobs;

export async function getServerSideProps(ctx: GetSessionOptions | undefined) {
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}
