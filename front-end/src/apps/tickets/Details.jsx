import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

import TasksTable from "../tasks/Table";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState({});
  const [tasks, setTasks] = useState([]);
  // May be if required, then divide into seperate state for each section.
  const [listingOptions, setListingOptions] = useState({
    size: 10,
    page: 1,
    sortDir: "desc",
    sortBy: "id",
    tasks: "",
    ticketId: id,
  });

  const handleEdit = (id) => {
    navigate(`/tickets/${id}/edit`);
  };

  const handleAdd = (module) => {
    navigate(`/${module}/add`, {
      state: { fromPage: "tickets", ticketId: id },
    });
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getTicket = () => {
    fetch(`${constants.API_ENDPOINT}/tickets/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setTicket(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Resolve the dep. warning by useEffect hook.
  useEffect(() => {
    getTicket();
  }, []);

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getTasks = (payload) => {
    const { size, page, sortDir, sortBy, tasks, ticketId } = payload;

    fetch(
      `${constants.API_ENDPOINT}/tasks?ticketId=${ticketId}&search=${tasks}&size=${size}&page=${page}&sortDir=${sortDir}&sortBy=${sortBy}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setTasks(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Dep. should be specefic as it currently re-render every search in different section.
  useEffect(() => {
    getTasks(listingOptions);
  }, [listingOptions]);

  const handleSearch = (e, field) => {
    setListingOptions({ ...listingOptions, [field]: e.target.value });
  };

  return (
    <Layout>
      <div className="row align-items-center">
        <div className="col-md-8 text-start">
          <h1>Details</h1>
        </div>
        <div className="col-md-4 text-end">
          <button
            type="button"
            onClick={() => handleEdit(ticket.id)}
            className="btn btn-primary"
          >
            Edit ticket
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <span className="d-block fw-500">Title</span>
            <span className="d-block fs-4">{ticket.title}</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <span className="d-block fw-500">Priority</span>
          <span className="d-block fs-4">{ticket.priority}</span>
        </div>
        <div className="col-md-6">
          <span className="d-block fw-500">Status</span>
          <span className="d-block fs-4">{ticket.status}</span>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <span className="d-block fw-500">Assignee</span>
          <span className="d-block fs-4">{ticket.assignee}</span>
        </div>
        <div className="col-md-6">
          <span className="d-block fw-500">Type</span>
          <span className="d-block fs-4">{ticket.type}</span>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <span className="d-block fw-500">Due date</span>
          <span className="d-block fs-4">{ticket.dueOn}</span>
        </div>
      </div>

      {/* Inline tasks section. */}
      <div className="row align-items-center mb-2">
        <div className="col-md-8 text-start">
          <h3>Tasks</h3>
        </div>
        <div className="col-md-4 text-end">
          <button
            type="button"
            onClick={() => handleAdd("tasks")}
            className="btn btn-primary"
          >
            Add task
          </button>
        </div>
      </div>

      <input
        type="text"
        name="tasks"
        id="tasks"
        placeholder="Search"
        className="form-control"
        value={listingOptions.tasks}
        onChange={(e) => handleSearch(e, "tasks")}
      />

      <TasksTable tasks={tasks} />
    </Layout>
  );
};

export default Details;
