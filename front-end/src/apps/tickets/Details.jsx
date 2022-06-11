import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState({});

  const handleEdit = (id) => {
    navigate(`/tickets/${id}/edit`);
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getTicket = () => {
    fetch(`${constants.API_ENDPOINT}/tickets/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setTicket(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Resolve the dep. warning by useEffect hook.
  useEffect(() => {
    getTicket();
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
            onClick={() => handleEdit(ticket.id)}
            className="btn btn-primary me-2"
          >
            Edit ticket
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <span className="d-block fw-500">Title</span>
            <span className="d-block fs-4">{ticket.title}</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <span className="d-block fw-500">Priority</span>
          <span className="d-block fs-4">{ticket.priority}</span>
        </div>
        <div className="col-md-6">
          <span className="d-block fw-500">Status</span>
          <span className="d-block fs-4">{ticket.status}</span>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <span className="d-block fw-500">Assignee</span>
          <span className="d-block fs-4">{ticket.assignee}</span>
        </div>
        <div className="col-md-6">
          <span className="d-block fw-500">Type</span>
          <span className="d-block fs-4">{ticket.type}</span>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <span className="d-block fw-500">Due date</span>
          <span className="d-block fs-4">{ticket.dueOn}</span>
        </div>
      </div>
    </Layout>
  );
};

export default Details;
