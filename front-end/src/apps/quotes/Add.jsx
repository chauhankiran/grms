import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import constants from "../../constants";
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

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <label htmlFor="name">Quote name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="e.g. 42 Monitors"
                className="form-control"
                value={quote.name || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="total">Quote total</label>
              <input
                type="text"
                name="total"
                id="total"
                placeholder="e.g. 120000"
                className="form-control"
                value={quote.total || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="expireOn">Expire date</label>
              <input
                type="text"
                name="expireOn"
                id="expireOn"
                placeholder="e.g. 12/03/2022"
                className="form-control"
                value={quote.expireOn || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary me-2">
            Create quote
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
