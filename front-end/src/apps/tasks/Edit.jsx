import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState({});

  const handleCancel = () => {
    navigate("/tasks");
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getTask = () => {
    fetch(`${constants.API_ENDPOINT}/tasks/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setTask(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Resolve the dep. warning by useEffect hook.
  useEffect(() => {
    getTask();
  }, []);

  // TODO: Re-arrange this code to put is somewhere else or refactor into function.
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${constants.API_ENDPOINT}/tasks/${id}`, {
      method: "PUT",
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

  return (
    <Layout>
      <h1>Edit task</h1>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="e.g. 42 Monitors"
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
            Update task
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
