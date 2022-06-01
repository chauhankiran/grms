import { useState } from "react";
import { Link } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const Register = () => {
  const [registerFormFields, setRegisterFormFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    isDisplay: true,
  });

  const handleChange = (e) => {
    setRegisterFormFields({
      ...registerFormFields,
      error: "",
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Add more validations
    if (
      !registerFormFields.firstName ||
      !registerFormFields.lastName ||
      !registerFormFields.email ||
      !registerFormFields.password ||
      !registerFormFields.confirmPassword
    ) {
      setRegisterFormFields({
        ...registerFormFields,
        error: "All fields are required.",
      });
      return false;
    }
    if (registerFormFields.password.length < 6) {
      setRegisterFormFields({
        ...registerFormFields,
        error: "Password must be at least 6 characters long.",
      });
      return false;
    }
    if (registerFormFields.password !== registerFormFields.confirmPassword) {
      setRegisterFormFields({
        ...registerFormFields,
        error: "Entered password doesn't match",
      });
      return false;
    }

    const registerFormFieldsObj = {
      firstName: registerFormFields.firstName,
      lastName: registerFormFields.lastName,
      email: registerFormFields.email,
      password: registerFormFields.password,
      confirmPassword: registerFormFields.confirmPassword,
    };

    fetch(`${constants.API_ENDPOINT}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerFormFieldsObj),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setRegisterFormFields({ ...registerFormFields, isDisplay: false });
        }
      })
      .catch((error) => console.log(error));
  };

  // Once the account is created, display this message.
  if (!registerFormFields.isDisplay) {
    return (
      <Layout>
        <h1 className="text-center">Thank You</h1>
        <p>
          Your account is created. Please verify the account by clicking on
          verfication link in registered email.
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-center">Register</h1>

      {registerFormFields.error && (
        <div className="alert alert-warning" role="alert">
          {registerFormFields.error}
        </div>
      )}

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
            autoFocus
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
