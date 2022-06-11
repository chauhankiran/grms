import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contact, setContact] = useState({});
  const [deals, setDeals] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [tasks, setTasks] = useState([]);
  // May be if required, then divide into seperate state for each section.
  const [listingOptions, setListingOptions] = useState({
    size: 10,
    page: 1,
    sortDir: "desc",
    sortBy: "id",
    deals: "",
    quotes: "",
    tickets: "",
    tasks: "",
    contactId: id,
  });

  const handleEdit = (id) => {
    navigate(`/contacts/${id}/edit`);
  };

  const handleAdd = (module) => {
    navigate(`/${module}/add`, {
      state: { fromPage: "contacts", contactId: id },
    });
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getContact = () => {
    fetch(`${constants.API_ENDPOINT}/contacts/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setContact(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Resolve the dep. warning by useEffect hook.
  useEffect(() => {
    getContact();
  }, []);

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getDeals = (payload) => {
    const { size, page, sortDir, sortBy, deals, contactId } = payload;

    fetch(
      `${constants.API_ENDPOINT}/deals?contactId=${contactId}&search=${deals}&size=${size}&page=${page}&sortDir=${sortDir}&sortBy=${sortBy}`,
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
      .then((data) => setDeals(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getQuotes = (payload) => {
    const { size, page, sortDir, sortBy, quotes, contactId } = payload;

    fetch(
      `${constants.API_ENDPOINT}/quotes?contactId=${contactId}&search=${quotes}&size=${size}&page=${page}&sortDir=${sortDir}&sortBy=${sortBy}`,
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
      .then((data) => setQuotes(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getTickets = (payload) => {
    const { size, page, sortDir, sortBy, tickets, contactId } = payload;

    fetch(
      `${constants.API_ENDPOINT}/tickets?contactId=${contactId}&search=${tickets}&size=${size}&page=${page}&sortDir=${sortDir}&sortBy=${sortBy}`,
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
      .then((data) => setTickets(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getTasks = (payload) => {
    const { size, page, sortDir, sortBy, tasks, contactId } = payload;

    fetch(
      `${constants.API_ENDPOINT}/tasks?contactId=${contactId}&search=${tasks}&size=${size}&page=${page}&sortDir=${sortDir}&sortBy=${sortBy}`,
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
      .then((data) => setTasks(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Dep. should be specefic as it currently re-render every search in different section.
  useEffect(() => {
    getDeals(listingOptions);
    getQuotes(listingOptions);
    getTickets(listingOptions);
    getTasks(listingOptions);
  }, [listingOptions]);

  const handleSearch = (e, field) => {
    setListingOptions({ ...listingOptions, [field]: e.target.value });
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
            onClick={() => handleEdit(contact.id)}
            className="btn btn-primary"
          >
            Edit contact
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <span className="d-block fw-500">First name</span>
            <span className="d-block fs-4">{contact.firstName}</span>
          </div>
        </div>
        <div className="col-md-12">
          <div className="mb-3">
            <span className="d-block fw-500">Last name</span>
            <span className="d-block fs-4">{contact.lastName}</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Email</span>
            <span className="d-block fs-5">{contact.email}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Title</span>
            <span className="d-block fs-5">{contact.title}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Phone</span>
            <span className="d-block fs-5">{contact.phone}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Mobile</span>
            <span className="d-block fs-5">{contact.mobile}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Address 1</span>
            <span className="d-block fs-5">{contact.address1}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Address 2</span>
            <span className="d-block fs-5">{contact.address2}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Address 3</span>
            <span className="d-block fs-5">{contact.address3}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">City</span>
            <span className="d-block fs-5">{contact.city}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">State</span>
            <span className="d-block fs-5">{contact.state}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Zip</span>
            <span className="d-block fs-5">{contact.zip}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Prefix</span>
            <span className="d-block fs-5">{contact.prefix}</span>
          </div>
        </div>

        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Country</span>
            <span className="d-block fs-5">{contact.country}</span>
          </div>
        </div>
      </div>

      {/* Inline deals section. */}
      <div className="row align-items-center mb-2">
        <div className="col-md-8 text-start">
          <h3>Deals</h3>
        </div>
        <div className="col-md-4 text-end">
          <button
            type="button"
            onClick={() => handleAdd("deals")}
            className="btn btn-primary"
          >
            Add deal
          </button>
        </div>
      </div>

      <input
        type="text"
        name="deals"
        id="deals"
        placeholder="Deals"
        className="form-control"
        value={listingOptions.deals}
        onChange={(e) => handleSearch(e, "deals")}
      />

      <table className="table table-bordered table-hover my-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Deal name</th>
            <th>Created by</th>
            <th>Created on</th>
            <th>Updated by</th>
            <th>Updated on</th>
          </tr>
        </thead>
        <tbody>
          {deals.length > 0 &&
            deals.map((deal) => {
              return (
                <tr key={deal.id}>
                  <td>
                    <Link to={`/deals/${deal.id}`}>{deal.id}</Link>
                  </td>
                  <td>
                    <Link to={`/deals/${deal.id}`}>{deal.name}</Link>
                  </td>
                  {/* TODO: Display full name of the user. */}
                  <td>{deal.createdBy ? deal.createdBy : "-"}</td>
                  <td>
                    {deal.createdOn ? moment(deal.createdOn).fromNow() : "-"}
                  </td>
                  <td>{deal.updatedBy ? deal.updatedBy : "-"}</td>
                  <td>
                    {deal.updatedOn ? moment(deal.updatedOn).fromNow() : "-"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* Inline quotes section. */}
      <div className="row align-items-center mb-2">
        <div className="col-md-8 text-start">
          <h3>Quotes</h3>
        </div>
        <div className="col-md-4 text-end">
          <button
            type="button"
            onClick={() => handleAdd("quotes")}
            className="btn btn-primary"
          >
            Add quote
          </button>
        </div>
      </div>

      <input
        type="text"
        name="quotes"
        id="quotes"
        placeholder="Quotes"
        className="form-control"
        value={listingOptions.quotes}
        onChange={(e) => handleSearch(e, "quotes")}
      />

      <table className="table table-bordered table-hover my-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Quote name</th>
            <th>Created by</th>
            <th>Created on</th>
            <th>Updated by</th>
            <th>Updated on</th>
          </tr>
        </thead>
        <tbody>
          {quotes.length > 0 &&
            quotes.map((quote) => {
              return (
                <tr key={quote.id}>
                  <td>
                    <Link to={`/quotes/${quote.id}`}>{quote.id}</Link>
                  </td>
                  <td>
                    <Link to={`/quotes/${quote.id}`}>{quote.name}</Link>
                  </td>
                  {/* TODO: Display full name of the user. */}
                  <td>{quote.createdBy ? quote.createdBy : "-"}</td>
                  <td>
                    {quote.createdOn ? moment(quote.createdOn).fromNow() : "-"}
                  </td>
                  <td>{quote.updatedBy ? quote.updatedBy : "-"}</td>
                  <td>
                    {quote.updatedOn ? moment(quote.updatedOn).fromNow() : "-"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* Inline tickets section. */}
      <div className="row align-items-center mb-2">
        <div className="col-md-8 text-start">
          <h3>Tickets</h3>
        </div>
        <div className="col-md-4 text-end">
          <button
            type="button"
            onClick={() => handleAdd("tickets")}
            className="btn btn-primary"
          >
            Add ticket
          </button>
        </div>
      </div>

      <input
        type="text"
        name="tickets"
        id="tickets"
        placeholder="Tickets"
        className="form-control"
        value={listingOptions.tickets}
        onChange={(e) => handleSearch(e, "tickets")}
      />

      <table className="table table-bordered table-hover my-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Created by</th>
            <th>Created on</th>
            <th>Updated by</th>
            <th>Updated on</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 &&
            tickets.map((ticket) => {
              return (
                <tr key={ticket.id}>
                  <td>
                    <Link to={`/tickets/${ticket.id}`}>{ticket.id}</Link>
                  </td>
                  <td>
                    <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                  </td>
                  {/* TODO: Display full name of the user. */}
                  <td>{ticket.createdBy ? ticket.createdBy : "-"}</td>
                  <td>
                    {ticket.createdOn
                      ? moment(ticket.createdOn).fromNow()
                      : "-"}
                  </td>
                  <td>{ticket.updatedBy ? ticket.updatedBy : "-"}</td>
                  <td>
                    {ticket.updatedOn
                      ? moment(ticket.updatedOn).fromNow()
                      : "-"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* Inline tasks section. */}
      <div className="row align-items-center mb-2">
        <div className="col-md-8 text-start">
          <h3>Tasks</h3>
        </div>
        <div className="col-md-4 text-end">
          <button
            type="button"
            onClick={() => handleAdd("tasks")}
            className="btn btn-primary"
          >
            Add task
          </button>
        </div>
      </div>

      <input
        type="text"
        name="tasks"
        id="tasks"
        placeholder="Tasks"
        className="form-control"
        value={listingOptions.tasks}
        onChange={(e) => handleSearch(e, "tasks")}
      />

      <table className="table table-bordered table-hover my-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Created by</th>
            <th>Created on</th>
            <th>Updated by</th>
            <th>Updated on</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 &&
            tasks.map((task) => {
              return (
                <tr key={task.id}>
                  <td>
                    <Link to={`/tasks/${task.id}`}>{task.id}</Link>
                  </td>
                  <td>
                    <Link to={`/tasks/${task.id}`}>{task.title}</Link>
                  </td>
                  {/* TODO: Display full name of the user. */}
                  <td>{task.createdBy ? task.createdBy : "-"}</td>
                  <td>
                    {task.createdOn ? moment(task.createdOn).fromNow() : "-"}
                  </td>
                  <td>{task.updatedBy ? task.updatedBy : "-"}</td>
                  <td>
                    {task.updatedOn ? moment(task.updatedOn).fromNow() : "-"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
};

export default Details;
