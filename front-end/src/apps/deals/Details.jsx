import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deal, setDeal] = useState({});

  const handleEdit = (id) => {
    navigate(`/deals/${id}/edit`);
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getDeal = () => {
    fetch(`${constants.API_ENDPOINT}/deals/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setDeal(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Resolve the dep. warning by useEffect hook.
  useEffect(() => {
    getDeal();
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
            onClick={() => handleEdit(deal.id)}
            className="btn btn-primary me-2"
          >
            Edit deal
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <span className="d-block fw-500">Deal name</span>
            <span className="d-block fs-4">{deal.name}</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Deal stage</span>
            <span className="d-block fs-5">{deal.stage}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Deal status</span>
            <span className="d-block fs-5">{deal.status}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Deal total</span>
            <span className="d-block fs-5">{deal.total}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Due date</span>
            <span className="d-block fs-5">{deal.dueDate}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Close date</span>
            <span className="d-block fs-5">{deal.closeDate}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Details;
