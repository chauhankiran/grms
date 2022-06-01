import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

const Reset = () => {
  const [resetFormFields, setResetFormFields] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setResetFormFields({ ...resetFormFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <h1 className="text-center">Reset password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="kai@doe.com"
            value={resetFormFields.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </div>

        <div className="mb-3">
          Remember the password? <Link to="/login">Login</Link>
        </div>
      </form>
    </Layout>
  );
};

export default Reset;
