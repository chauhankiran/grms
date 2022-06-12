import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import constants from "../../constants";
import Form from "./Form";
import Layout from "./Layout";

const Add = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [quote, setQuote] = useState({});

  const handleCancel = () => {
    navigate("/quotes");
  };

  const handleChange = (e) => {
    setQuote({ ...quote, [e.target.name]: e.target.value });
  };

  // TODO: Re-arrange this code to put is somewhere else or refactor into function.
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${constants.API_ENDPOINT}/quotes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(quote),
    })
      .then((res) => res.json())
      .then((data) => navigate(`/quotes/${data.data}`))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (state) {
      if (state.fromPage === "companies") {
        setQuote({ ...quote, companyId: state.companyId });
      } else if (state.fromPage === "contacts") {
        setQuote({ ...quote, contactId: state.contactId });
      } else if (state.fromPage === "deals") {
        setQuote({ ...quote, dealId: state.dealId });
      }
    }
  }, [state]);

  return (
    <Layout>
      <h1>Add quote</h1>

      <Form
        quote={quote}
        handleCancel={handleCancel}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default Add;
