import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Details = () => {
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/companies/${id}/edit`);
  };

  return (
    <Layout>
      <h1>Details</h1>

      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <span className="d-block fw-500">Company name</span>
            <span className="d-block fs-4">IBM, Inc.</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Website</span>
            <span className="d-block fs-5">https://ibm.com</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Fax</span>
            <span className="d-block fs-5">+01 111 222 33 44</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Phone</span>
            <span className="d-block fs-5">+01 999 888 77 77</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Mobile</span>
            <span className="d-block fs-5">+01 999 111 00 00</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Address 1</span>
            <span className="d-block fs-5">101 A Building</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Address 2</span>
            <span className="d-block fs-5">Main Street</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Address 3</span>
            <span className="d-block fs-5">Opp. Gandhi Statue</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">City</span>
            <span className="d-block fs-5">Gotham City</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">State</span>
            <span className="d-block fs-5">Taxas</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Zip</span>
            <span className="d-block fs-5">350 001</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Country</span>
            <span className="d-block fs-5">India</span>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <button
          type="button"
          onClick={() => handleEdit(1)}
          className="btn btn-primary me-2"
        >
          Edit company
        </button>
      </div>
    </Layout>
  );
};

export default Details;
