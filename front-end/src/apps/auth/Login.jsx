import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import constants from "../../constants";

const Login = () => {
  const navigate = useNavigate();

  const [loginFormFields, setLoginFormFields] = useState({
    email: "",
    password: "",
    error: "",
  });

  const handleChange = (e) => {
    setLoginFormFields({ ...loginFormFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Add more validations
    if (!loginFormFields.email || !loginFormFields.password) {
      setLoginFormFields({
        ...loginFormFields,
        error: "All fields are required.",
      });
      return false;
    }

    const loginFormFieldsObj = {
      email: loginFormFields.email,
      password: loginFormFields.password,
    };

    fetch(`${constants.API_ENDPOINT}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginFormFieldsObj),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          localStorage.setItem("token", data.data);
          navigate("/dashboard");
        } else {
          setLoginFormFields({
            ...loginFormFields,
            error: data.error,
          });
          return false;
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <Layout>
      <h1 className="text-center">Login</h1>

      {loginFormFields.error && (
        <div className="alert alert-warning" role="alert">
          {loginFormFields.error}
        </div>
      )}

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
            autoFocus
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
