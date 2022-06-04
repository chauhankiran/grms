import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const List = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getCompanies = () => {
    fetch(`${constants.API_ENDPOINT}/companies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setCompanies(data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const handleAddCompany = () => {
    navigate("/companies/add");
  };

  return (
    <Layout>
      <div className="row align-items-center">
        <div className="col-md-8 text-start">
          <h1>Companies</h1>
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-primary" onClick={handleAddCompany}>
            Add company
          </button>
        </div>
      </div>

      {/* TODO: Add search support. */}
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        className="form-control"
      />

      <table className="table table-bordered table-hover my-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Company name</th>
            <th>Created by</th>
            <th>Created on</th>
            <th>Updated by</th>
            <th>Updated on</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 &&
            companies.map((company) => {
              return (
                <tr>
                  <td>
                    <Link to={`/companies/${company.id}`}>{company.id}</Link>
                  </td>
                  <td>
                    <Link to={`/companies/${company.id}`}>{company.name}</Link>
                  </td>
                  {/* TODO: Display full name of the user. */}
                  <td>{company.createdBy ? company.createdBy : "-"}</td>
                  {/* TODO: Time should be in human readable form using moment e.g. 2 hours ago */}
                  <td>{company.createdOn ? company.createdOn : "-"}</td>
                  <td>{company.updatedBy ? company.updatedBy : "-"}</td>
                  <td>{company.updatedOn ? company.updatedOn : "-"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
};

export default List;
