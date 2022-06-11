import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const Add = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [task, setTask] = useState({});

  const handleCancel = () => {
    navigate("/tasks");
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // TODO: Re-arrange this code to put is somewhere else or refactor into function.
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${constants.API_ENDPOINT}/tasks`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => navigate(`/tasks/${data.data}`))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (state) {
      if (state.fromPage === "companies") {
        setTask({ ...task, companyId: state.companyId });
      } else if (state.fromPage === "contacts") {
        setTask({ ...task, contactId: state.contactId });
      } else if (state.fromPage === "deals") {
        setTask({ ...task, dealId: state.dealId });
      } else if (state.fromPage === "quotes") {
        setTask({ ...task, quoteId: state.quoteId });
      } else if (state.fromPage === "tickets") {
        setTask({ ...task, ticketId: state.ticketId });
      }
    }
  }, [state]);

  return (
    <Layout>
      <h1>Add task</h1>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="e.g. Arrange product demo"
                className="form-control"
                value={task.title || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="time">Time</label>
              <input
                type="text"
                name="time"
                id="time"
                placeholder="e.g. 12/01/2022"
                className="form-control"
                value={task.time || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary me-2">
            Create task
          </button>
          <button onClick={handleCancel} className="btn btn-light me-2">
            Cancel
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Add;
