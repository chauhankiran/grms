import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const Edit = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/companies");
  };

  return (
    <Layout>
      <h1>Edit company</h1>

      <form>
        <div className="row">
          <div className="col-md-12">
            <div className="mb-3">
              <label htmlFor="name">Company name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="e.g. IBM, Inc."
                className="form-control"
                value="IBM, Inc."
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                name="website"
                id="website"
                placeholder="e.g. https://ibm.com"
                className="form-control"
                value="https://ibm.com"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="fax">Fax</label>
              <input
                type="text"
                name="fax"
                id="fax"
                placeholder="e.g. +01 111 222 33 44"
                className="form-control"
                value="+01 111 222 33 44"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="e.g. +01 999 888 77 77"
                className="form-control"
                value="+01 999 888 77 77"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                name="mobile"
                id="mobile"
                placeholder="e.g. +01 999 111 00 00"
                className="form-control"
                value="+01 999 111 00 00"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="address1">Address 1</label>
              <input
                type="text"
                name="address1"
                id="address1"
                placeholder="e.g. 101 A Building"
                className="form-control"
                value="101 A Building"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="address2">Address 2</label>
              <input
                type="text"
                name="address2"
                id="address2"
                placeholder="e.g. Main Street"
                className="form-control"
                value="Main Street"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="address3">Address 3</label>
              <input
                type="text"
                name="address3"
                id="address3"
                placeholder="e.g. Opp. Gandhi Statue"
                className="form-control"
                value="Opp. Gandhi Statue"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="e.g. Gotham City"
                className="form-control"
                value="Gotham City"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="state">State</label>
              <select name="state" id="state" className="form-select">
                <option value="1">Taxas</option>
                <option value="2">Salsa</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="zip">Zip</label>
              <input
                type="text"
                name="zip"
                id="zip"
                placeholder="e.g. 350 001"
                className="form-control"
                value="350 001"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="country">Country</label>
              <select name="country" id="country" className="form-select">
                <option value="1">India</option>
                <option value="2">Japan</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary me-2">
            Update company
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
