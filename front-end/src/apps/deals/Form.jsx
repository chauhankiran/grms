const Form = ({ mode, deal, handleCancel, handleChange, handleSubmit }) => {
  return (
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
          {mode === "create" ? "Create" : "Update"} deal
        </button>
        <button onClick={handleCancel} className="btn btn-light me-2">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
