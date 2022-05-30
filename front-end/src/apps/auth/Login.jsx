import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

const Login = () => {
  const [loginFormFields, setLoginFormFields] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginFormFields({ ...loginFormFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="kai@doe.com"
            value={loginFormFields.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="********"
            value={loginFormFields.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>

        <div className="mb-3">
          Don't have an account? <Link to="/register">Register</Link>
        </div>

        <div className="mb-3">
          Forgot password? <Link to="/reset">Reset</Link>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
