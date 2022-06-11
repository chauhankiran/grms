import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quote, setQuote] = useState({});

  const handleCancel = () => {
    navigate("/quotes");
  };

  const handleChange = (e) => {
    setQuote({ ...quote, [e.target.name]: e.target.value });
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getQuote = () => {
    fetch(`${constants.API_ENDPOINT}/quotes/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setQuote(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Resolve the dep. warning by useEffect hook.
  useEffect(() => {
    getQuote();
  }, []);

  // TODO: Re-arrange this code to put is somewhere else or refactor into function.
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${constants.API_ENDPOINT}/quotes/${id}`, {
      method: "PUT",
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

  return (
    <Layout>
      <h1>Edit quote</h1>

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
            Update quote
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
