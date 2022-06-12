const Form = ({ quote, handleCancel, handleChange, handleSubmit }) => {
  return (
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
          Create quote
        </button>
        <button onClick={handleCancel} className="btn btn-light me-2">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
