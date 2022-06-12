import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import constants from "../../constants";
import Form from "./Form";
import Layout from "./Layout";

const Add = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [ticket, setTicket] = useState({});

  const handleCancel = () => {
    navigate("/tickets");
  };

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  // TODO: Re-arrange this code to put is somewhere else or refactor into function.
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${constants.API_ENDPOINT}/tickets`, {
      method: "POST",
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

  useEffect(() => {
    if (state) {
      if (state.fromPage === "companies") {
        setTicket({ ...ticket, companyId: state.companyId });
      } else if (state.fromPage === "contacts") {
        setTicket({ ...ticket, contactId: state.contactId });
      } else if (state.fromPage === "deals") {
        setTicket({ ...ticket, dealId: state.dealId });
      } else if (state.fromPage === "quotes") {
        setTicket({ ...ticket, quoteId: state.quoteId });
      }
    }
  }, [state]);

  return (
    <Layout>
      <h1>Add ticket</h1>

      <Form
        ticket={ticket}
        handleCancel={handleCancel}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default Add;
