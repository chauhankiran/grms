import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import constants from "../../constants";
import Form from "./Form";
import Layout from "./Layout";

const Add = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [contact, setContact] = useState({});

  const handleCancel = () => {
    navigate("/contacts");
  };

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // TODO: Re-arrange this code to put is somewhere else or refactor into function.
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${constants.API_ENDPOINT}/contacts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(contact),
    })
      .then((res) => res.json())
      .then((data) => navigate(`/contacts/${data.data}`))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (state) {
      setContact({ ...contact, companyId: state.companyId });
    }
  }, [state]);

  return (
    <Layout>
      <h1>Add contact</h1>

      <Form
        contact={contact}
        handleCancel={handleCancel}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default Add;
