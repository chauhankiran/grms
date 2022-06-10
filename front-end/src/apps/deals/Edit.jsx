import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deal, setDeal] = useState({});

  const handleCancel = () => {
    navigate("/deals");
  };

  const handleChange = (e) => {
    setDeal({ ...deal, [e.target.name]: e.target.value });
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

  // TODO: Re-arrange this code to put is somewhere else or refactor into function.
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${constants.API_ENDPOINT}/deals/${id}`, {
      method: "PUT",
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

  return (
    <Layout>
      <h1>Edit deal</h1>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <label htmlFor="name">Deal name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="e.g. 42 Monitors"
                className="form-control"
                value={deal.name || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="stage">Deal stage</label>
              <select
                name="stage"
                id="stage"
                className="form-select"
                value={deal.stage || 0}
                onChange={handleChange}
              >
                <option value="0">None</option>
                <option value="1">Created</option>
                <option value="2">Initiated</option>
                <option value="2">Bargaining</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="status">Deal status</label>
              <select
                name="status"
                id="status"
                className="form-select"
                value={deal.status || 0}
                onChange={handleChange}
              >
                <option value="0">None</option>
                <option value="1">Created</option>
                <option value="2">Review</option>
                <option value="2">Close</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="total">Deal total</label>
              <input
                type="text"
                name="total"
                id="total"
                placeholder="e.g. 120000"
                className="form-control"
                value={deal.total || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="dueDate">Due date</label>
              <input
                type="text"
                name="dueDate"
                id="dueDate"
                placeholder="e.g. 12/03/2022"
                className="form-control"
                value={deal.dueDate || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="closeDate">Close date</label>
              <input
                type="text"
                name="closeDate"
                id="closeDate"
                placeholder="e.g. 24/03/2022"
                className="form-control"
                value={deal.closeDate || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary me-2">
            Update deal
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
