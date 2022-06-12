import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import constants from "../../constants";
import Form from "./Form";
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

      <Form
        mode="create"
        task={task}
        handleCancel={handleCancel}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default Add;
