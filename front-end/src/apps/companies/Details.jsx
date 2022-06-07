import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [contacts, setContacts] = useState([]);
  const [listingOptions, setListingOptions] = useState({
    size: 10,
    page: 1,
    sortDir: "desc",
    sortBy: "id",
    search: "",
    companyId: id,
  });

  const handleEdit = (id) => {
    navigate(`/companies/${id}/edit`);
  };

  const handleAddContact = () => {
    navigate("/contacts/add", {
      state: { fromPage: "companies", companyId: id },
    });
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getCompany = () => {
    fetch(`${constants.API_ENDPOINT}/companies/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setCompany(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Resolve the dep. warning by useEffect hook.
  useEffect(() => {
    getCompany();
  }, []);

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getContacts = (payload) => {
    const { size, page, sortDir, sortBy, search, companyId } = payload;

    fetch(
      `${constants.API_ENDPOINT}/contacts?companyId=${companyId}&search=${search}&size=${size}&page=${page}&sortDir=${sortDir}&sortBy=${sortBy}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setContacts(data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getContacts(listingOptions);
  }, [listingOptions]);

  const handleSearch = (e) => {
    setListingOptions({ ...listingOptions, search: e.target.value });
  };

  return (
    <Layout>
      <div className="row align-items-center">
        <div className="col-md-8 text-start">
          <h1>Details</h1>
        </div>
        <div className="col-md-4 text-end">
          <button
            type="button"
            onClick={() => handleEdit(company.id)}
            className="btn btn-primary me-2"
          >
            Edit company
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <span className="d-block fw-500">Company name</span>
            <span className="d-block fs-4">{company.name}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Website</span>
            <span className="d-block fs-5">{company.website}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Fax</span>
            <span className="d-block fs-5">{company.fax}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Phone</span>
            <span className="d-block fs-5">{company.phone}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Mobile</span>
            <span className="d-block fs-5">{company.mobile}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Address 1</span>
            <span className="d-block fs-5">{company.address1}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Address 2</span>
            <span className="d-block fs-5">{company.address2}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Address 3</span>
            <span className="d-block fs-5">{company.address3}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">City</span>
            <span className="d-block fs-5">{company.city}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">State</span>
            <span className="d-block fs-5">{company.state}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Zip</span>
            <span className="d-block fs-5">{company.zip}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Country</span>
            <span className="d-block fs-5">{company.country}</span>
          </div>
        </div>
      </div>

      <div className="row align-items-center mb-2">
        <div className="col-md-8 text-start">
          <h3>Contacts</h3>
        </div>
        <div className="col-md-4 text-end">
          <button
            type="button"
            onClick={handleAddContact}
            className="btn btn-primary me-2"
          >
            Add contact
          </button>
        </div>
      </div>

      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        className="form-control"
        value={listingOptions.search}
        onChange={handleSearch}
      />

      <table className="table table-bordered table-hover my-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Contact name</th>
            <th>Created by</th>
            <th>Created on</th>
            <th>Updated by</th>
            <th>Updated on</th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 &&
            contacts.map((contact) => {
              return (
                <tr key={contact.id}>
                  <td>
                    <Link to={`/contacts/${contact.id}`}>{contact.id}</Link>
                  </td>
                  <td>
                    <Link to={`/contacts/${contact.id}`}>
                      {contact.firstName + " " + contact.lastName}
                    </Link>
                  </td>
                  {/* TODO: Display full name of the user. */}
                  <td>{contact.createdBy ? contact.createdBy : "-"}</td>
                  {/* TODO: Time should be in human readable form using moment e.g. 2 hours ago */}
                  <td>{contact.createdOn ? contact.createdOn : "-"}</td>
                  <td>{contact.updatedBy ? contact.updatedBy : "-"}</td>
                  <td>{contact.updatedOn ? contact.updatedOn : "-"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
};

export default Details;
