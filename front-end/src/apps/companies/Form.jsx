const Form = ({
  mode,
  company,
  picklist,
  handleCancel,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          {/* TODO: Field should be conditional. If field is enable from admin, then
        only display else not. Also, add guard for future code enhancement. */}
          <div className="mb-3">
            <label htmlFor="name">Company name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="e.g. IBM, Inc."
              className="form-control"
              value={company.name || ""}
              onChange={handleChange}
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
              value={company.website || ""}
              onChange={handleChange}
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
              value={company.fax || ""}
              onChange={handleChange}
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
              value={company.phone || ""}
              onChange={handleChange}
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
              value={company.mobile || ""}
              onChange={handleChange}
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
              value={company.address1 || ""}
              onChange={handleChange}
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
              value={company.address2 || ""}
              onChange={handleChange}
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
              value={company.address3 || ""}
              onChange={handleChange}
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
              value={company.city || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="state">State</label>
            <select
              name="state"
              id="state"
              className="form-select"
              value={company.state || 0}
              onChange={handleChange}
            >
              <option value="0">None</option>
              {picklist.states &&
                picklist.states.map((state) => {
                  return (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  );
                })}
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
              value={company.zip || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="country">Country</label>
            <select
              name="country"
              id="country"
              className="form-select"
              value={company.country || 0}
              onChange={handleChange}
            >
              <option value="0">None</option>
              {picklist.countries &&
                picklist.countries.map((country) => {
                  return (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary me-2">
          {mode === "create" ? "Create" : "Update"} company
        </button>
        <button onClick={handleCancel} className="btn btn-light me-2">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
