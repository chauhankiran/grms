import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";

const Register = () => {
  const [registerFormFields, setRegisterFormFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });

  const handleChange = (e) => {
    setRegisterFormFields({
      ...registerFormFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //
  };

  return (
    <Layout>
      <h1 className="text-center">Register</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName">First name</label>
          <input
            type="firstName"
            name="firstName"
            id="firstName"
            className="form-control"
            placeholder="Kai"
            value={registerFormFields.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="lastName">Last name</label>
          <input
            type="lastName"
            name="lastName"
            id="lastName"
            className="form-control"
            placeholder="Doe"
            value={registerFormFields.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="kai@doe.com"
            value={registerFormFields.email}
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
            value={registerFormFields.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="form-control"
            placeholder="Repeat ********"
            value={registerFormFields.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>

        <div className="mb-3">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
