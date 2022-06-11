import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListSearch from "../../components/ListSearch";
import constants from "../../constants";
import Layout from "./Layout";

const List = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [listingOptions, setListingOptions] = useState({
    size: 10,
    page: 1,
    sortDir: "desc",
    sortBy: "id",
    search: "",
  });

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getContacts = (payload) => {
    const { size, page, sortDir, sortBy, search } = payload;

    fetch(
      `${constants.API_ENDPOINT}/contacts?search=${search}&size=${size}&page=${page}&sortDir=${sortDir}&sortBy=${sortBy}`,
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

  const handleAddContact = () => {
    navigate("/contacts/add");
  };

  const handleSearch = (e) => {
    setListingOptions({ ...listingOptions, search: e.target.value });
  };

  return (
    <Layout>
      <div className="row align-items-center">
        <div className="col-md-8 text-start">
          <h1>Contacts</h1>
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-primary" onClick={handleAddContact}>
            Add contact
          </button>
        </div>
      </div>

      {/* Inline search on contacts. */}
      <ListSearch search={listingOptions.search} handleSearch={handleSearch} />

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
                  <td>
                    {contact.createdOn
                      ? moment(contact.createdOn).fromNow()
                      : "-"}
                  </td>
                  <td>{contact.updatedBy ? contact.updatedBy : "-"}</td>
                  <td>
                    {contact.updatedOn
                      ? moment(contact.updatedOn).fromNow()
                      : "-"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
};

export default List;
