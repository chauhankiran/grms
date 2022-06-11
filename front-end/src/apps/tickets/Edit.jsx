import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState({});

  const handleCancel = () => {
    navigate("/tickets");
  };

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
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

  // TODO: Re-arrange this code to put is somewhere else or refactor into function.
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${constants.API_ENDPOINT}/tickets/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(ticket),
    })
      .then((res) => res.json())
      .then((data) => navigate(`/tickets/${data.data}`))
      .catch((error) => console.log(error));
  };

  return (
    <Layout>
      <h1>Edit ticket</h1>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <label htmlFor="name">Title</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="e.g. 42 Monitors"
                className="form-control"
                value={ticket.title || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="priority">Priority</label>
              <select
                name="priority"
                id="priority"
                className="form-select"
                value={ticket.priority || 0}
                onChange={handleChange}
              >
                <option value="0">None</option>
                <option value="1">Low</option>
                <option value="2">Normal</option>
                <option value="2">Medium</option>
                <option value="2">High</option>
                <option value="2">Urgent</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="status">Status</label>
              <select
                name="status"
                id="status"
                className="form-select"
                value={ticket.status || 0}
                onChange={handleChange}
              >
                <option value="0">None</option>
                <option value="1">Created</option>
                <option value="2">Assigned</option>
                <option value="2">In progress</option>
                <option value="2">Review</option>
                <option value="2">Closed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="assignee">Assignee</label>
              <select
                name="assignee"
                id="assignee"
                className="form-select"
                value={ticket.assignee || 0}
                onChange={handleChange}
              >
                <option value="0">None</option>
                <option value="1">Jane</option>
                <option value="2">Kai</option>
                <option value="2">Marry</option>
                <option value="2">Julia</option>
                <option value="2">Will</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="type">Type</label>
              <select
                name="type"
                id="type"
                className="form-select"
                value={ticket.type || 0}
                onChange={handleChange}
              >
                <option value="0">None</option>
                <option value="1">Question</option>
                <option value="2">Bug</option>
                <option value="2">Enhancement</option>
                <option value="2">Doc</option>
                <option value="2">UI</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="dueOn">Due date</label>
              <input
                type="text"
                name="dueOn"
                id="dueOn"
                placeholder="e.g. 12/01/2022"
                className="form-control"
                value={ticket.dueOn || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary me-2">
            Update ticket
          </button>
          <button onClick={handleCancel} className="btn btn-light me-2">
            Cancel
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Edit;
