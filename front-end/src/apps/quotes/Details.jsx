import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quote, setQuote] = useState({});

  const handleEdit = (id) => {
    navigate(`/quotes/${id}/edit`);
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

  return (
    <Layout>
      <div className="row align-items-center">
        <div className="col-md-8 text-start">
          <h1>Details</h1>
        </div>
        <div className="col-md-4 text-end">
          <button
            type="button"
            onClick={() => handleEdit(quote.id)}
            className="btn btn-primary me-2"
          >
            Edit quote
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <span className="d-block fw-500">Quote name</span>
            <span className="d-block fs-4">{quote.name}</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Quote total</span>
            <span className="d-block fs-5">{quote.total}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Expire date</span>
            <span className="d-block fs-5">{quote.expireOn}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Details;
