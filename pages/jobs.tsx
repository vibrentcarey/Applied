import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { SiIndeed, SiLinkedin, SiGlassdoor } from "react-icons/si";
import { HiExternalLink } from "react-icons/hi";
import { CgSearchLoading } from "react-icons/cg";
import { getSession, GetSessionOptions } from "next-auth/client";
import { useRouter } from "next/router";
import RiseLoader from "react-spinners/RiseLoader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Modal from "../components/Modal";
import Link from "next/link";

const Jobs = ({ session }) => {
  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | React.ReactNode>(
    ""
  );
  const [modalTitle, setModalTitle] = useState("");
  const [modalId, setModalId] = useState('');
  const [modalMode, setModalMode] = useState("");
  const [selectStatus, setSelectStatus] = useState("pending");
  const router = useRouter();

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

  console.log(selectStatus);
  useEffect(() => {
    if (session) {
      loadData(session.user.email);
    } else {
      router.replace("/auth");
    }
  }, [session, router]);

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

  const confirmDelete = (id: string) => {
    setModalId(id);
    setModalMode("delete");
    setModalTitle("Confirm Delete");
    setModalMessage("Are you sure you want to delete this job?");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setSelectStatus(event.target.value);
  };

  const confirmEdit = (id :string) => {
    setModalId(id);
    setModalMode("edit");
    setModalTitle("Edit Status");
    setModalMessage(
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
    );
    setShowModal(true);
  };

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
    if (modalMode === "delete") {
      deleteJob(id);
    }
    if (modalMode === "edit") {
      editJob(id);
    }
  };
  return (
    <div className="">
      <Modal
        showModal={showModal}
        message={modalMessage}
        close={closeModal}
        confirm={submit}
        id={modalId}
        title={modalTitle}
      />
      <h1 className="mt-8 text-center text-4xl font-bold text-primary">
        Your Applications
      </h1>
      {loading ? (
        <div className="flex justify-center w-full my-20">
          <h3 className="text-secondary mx-2 font-semibold text-lg"></h3>
          <CgSearchLoading className="text-secondary mx-2 text-4xl" />
          <RiseLoader color="#E9498C" />{" "}
        </div>
      ) : (
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
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {habits &&
                habits.map((habit, i) => (
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
                <th>Edit</th>

                <th>Delete</th>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
      {habits.length === 0 && !loading && (
        <p className="text-center m-4">
          Nothing here -{" "}
          <button className="link link-primary">
            <Link href="/add">Add Application</Link>
          </button>
        </p>
      )}
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
