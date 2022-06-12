const Form = ({ task, handleCancel, handleChange, handleSubmit }) => {
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
              placeholder="e.g. Arrange product demo"
              className="form-control"
              value={task.title || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              placeholder="e.g. 12/01/2022"
              className="form-control"
              value={task.time || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <button type="submit" className="btn btn-primary me-2">
          Create task
        </button>
        <button onClick={handleCancel} className="btn btn-light me-2">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
