import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import constants from "../../constants";
import Form from "./Form";
import Layout from "./Layout";

const Add = () => {
  const navigate = useNavigate();
  const [company, setCompany] = useState({});
  const [picklist, setPicklist] = useState({});

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getStates = () => {
    fetch(`${constants.API_ENDPOINT}/fields/picklist/state`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPicklist((prevPicklist) => {
          return { ...prevPicklist, states: data.data };
        });
      })
      .catch((error) => console.log(error));
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getCountries = () => {
    fetch(`${constants.API_ENDPOINT}/fields/picklist/country`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPicklist((prevPicklist) => {
          return { ...prevPicklist, countries: data.data };
        });
      })
      .catch((error) => console.log(error));
  };

  // TODO: Update the dep array to check if states field exist,
  // if yes, then go ahead and fetch the state picklist.
  useEffect(() => {
    getStates();
    getCountries();
  }, []);

  const handleCancel = () => {
    navigate("/companies");
  };

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  // TODO: Re-arrange this code to put is somewhere else or refactor into function.
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${constants.API_ENDPOINT}/companies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(company),
    })
      .then((res) => res.json())
      .then((data) => navigate(`/companies/${data.data}`))
      .catch((error) => console.log(error));
  };

  return (
    <Layout>
      <h1>Add company</h1>

      <Form
        mode="create"
        company={company}
        picklist={picklist}
        handleCancel={handleCancel}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default Add;
