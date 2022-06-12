import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import constants from "../../constants";
import Form from "./Form";
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

      <Form
        mode="update"
        task={task}
        handleCancel={handleCancel}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default Edit;
