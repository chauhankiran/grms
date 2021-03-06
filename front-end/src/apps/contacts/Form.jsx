const Form = ({ mode, contact, handleCancel, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="e.g. Kai"
              className="form-control"
              value={contact.firstName || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="e.g. Doe"
              className="form-control"
              value={contact.lastName || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="e.g. kai@ibm.com"
              className="form-control"
              value={contact.email || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="e.g. Manager"
              className="form-control"
              value={contact.title || ""}
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
              value={contact.phone || ""}
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
              value={contact.mobile || ""}
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
              value={contact.address1 || ""}
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
              value={contact.address2 || ""}
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
              value={contact.address3 || ""}
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
              value={contact.city || ""}
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
              value={contact.state || 0}
              onChange={handleChange}
            >
              <option value="0">None</option>
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
              value={contact.zip || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="prefix">Prefix</label>
            <input
              type="text"
              name="prefix"
              id="prefix"
              placeholder="e.g. Miss."
              className="form-control"
              value={contact.prefix || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="country">Country</label>
            <select
              name="country"
              id="country"
              className="form-select"
              value={contact.country || 0}
              onChange={handleChange}
            >
              <option value="0">None</option>
              <option value="1">India</option>
              <option value="2">Japan</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary me-2">
          {mode === "create" ? "Create" : "Update"} contact
        </button>
        <button onClick={handleCancel} className="btn btn-light me-2">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
