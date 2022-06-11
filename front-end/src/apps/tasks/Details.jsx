import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = useState({});

  const handleEdit = (id) => {
    navigate(`/tasks/${id}/edit`);
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

  return (
    <Layout>
      <div className="row align-items-center">
        <div className="col-md-8 text-start">
          <h1>Details</h1>
        </div>
        <div className="col-md-4 text-end">
          <button
            type="button"
            onClick={() => handleEdit(task.id)}
            className="btn btn-primary"
          >
            Edit task
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <span className="d-block fw-500">Title</span>
            <span className="d-block fs-4">{task.title}</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <span className="d-block fw-500">Time</span>
          <span className="d-block fs-4">{task.time}</span>
        </div>
      </div>
    </Layout>
  );
};

export default Details;
