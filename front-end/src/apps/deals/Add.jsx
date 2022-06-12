import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import constants from "../../constants";
import Form from "./Form";
import Layout from "./Layout";

const Add = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [deal, setDeal] = useState({});

  const handleCancel = () => {
    navigate("/deals");
  };

  const handleChange = (e) => {
    setDeal({ ...deal, [e.target.name]: e.target.value });
  };

  // TODO: Re-arrange this code to put is somewhere else or refactor into function.
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${constants.API_ENDPOINT}/deals`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(deal),
    })
      .then((res) => res.json())
      .then((data) => navigate(`/deals/${data.data}`))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (state) {
      if (state.fromPage === "companies") {
        setDeal({ ...deal, companyId: state.companyId });
      } else if (state.fromPage === "contacts") {
        setDeal({ ...deal, contactId: state.contactId });
      }
    }
  }, [state]);

  return (
    <Layout>
      <h1>Add deal</h1>

      <Form
        deal={deal}
        handleCancel={handleCancel}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default Add;
