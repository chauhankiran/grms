import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [company, setCompany] = useState({});

  const handleEdit = (id) => {
    navigate(`/companies/${id}/edit`);
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getCompany = () => {
    fetch(`${constants.API_ENDPOINT}/companies/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setCompany(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Resolve the dep. warning by useEffect hook.
  useEffect(() => {
    getCompany();
  }, []);

  return (
    <Layout>
      <h1>Details</h1>

      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <span className="d-block fw-500">Company name</span>
            <span className="d-block fs-4">{company.name}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Website</span>
            <span className="d-block fs-5">{company.website}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Fax</span>
            <span className="d-block fs-5">{company.fax}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Phone</span>
            <span className="d-block fs-5">{company.phone}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Mobile</span>
            <span className="d-block fs-5">{company.mobile}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Address 1</span>
            <span className="d-block fs-5">{company.address1}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Address 2</span>
            <span className="d-block fs-5">{company.address2}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Address 3</span>
            <span className="d-block fs-5">{company.address3}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">City</span>
            <span className="d-block fs-5">{company.city}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">State</span>
            <span className="d-block fs-5">{company.state}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Zip</span>
            <span className="d-block fs-5">{company.zip}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Country</span>
            <span className="d-block fs-5">{company.country}</span>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <button
          type="button"
          onClick={() => handleEdit(company.id)}
          className="btn btn-primary me-2"
        >
          Edit company
        </button>
      </div>
    </Layout>
  );
};

export default Details;
