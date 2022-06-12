const Form = ({ mode, ticket, handleCancel, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="e.g. Internet Speed Decrease"
              className="form-control"
              value={ticket.title || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="priority">Priority</label>
            <select
              name="priority"
              id="priority"
              className="form-select"
              value={ticket.priority || 0}
              onChange={handleChange}
            >
              <option value="0">None</option>
              <option value="1">Low</option>
              <option value="2">Normal</option>
              <option value="3">Medium</option>
              <option value="4">High</option>
              <option value="5">Urgent</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="status">Status</label>
            <select
              name="status"
              id="status"
              className="form-select"
              value={ticket.status || 0}
              onChange={handleChange}
            >
              <option value="0">None</option>
              <option value="1">Created</option>
              <option value="2">Assigned</option>
              <option value="3">In progress</option>
              <option value="4">Review</option>
              <option value="5">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="assignee">Assignee</label>
            <select
              name="assignee"
              id="assignee"
              className="form-select"
              value={ticket.assignee || 0}
              onChange={handleChange}
            >
              <option value="0">None</option>
              <option value="1">Jane</option>
              <option value="2">Kai</option>
              <option value="3">Marry</option>
              <option value="4">Julia</option>
              <option value="5">Will</option>
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="type">Type</label>
            <select
              name="type"
              id="type"
              className="form-select"
              value={ticket.type || 0}
              onChange={handleChange}
            >
              <option value="0">None</option>
              <option value="1">Question</option>
              <option value="2">Bug</option>
              <option value="3">Enhancement</option>
              <option value="4">Doc</option>
              <option value="5">UI</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="dueOn">Due date</label>
            <input
              type="text"
              name="dueOn"
              id="dueOn"
              placeholder="e.g. 12/01/2022"
              className="form-control"
              value={ticket.dueOn || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary me-2">
          {mode === "create" ? "Create" : "Update"} ticket
        </button>
        <button onClick={handleCancel} className="btn btn-light me-2">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
