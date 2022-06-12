import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./Layout";

import getList from "../../services/getList";
import getDetails from "../../services/getDetails";

import DealsTable from "../deals/Table";
import QuotesTable from "../quotes/Table";
import TicketsTable from "../tickets/Table";
import TasksTable from "../tasks/Table";

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
    getDetails("contacts", id)
      .then((data) => setContact(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Resolve the dep. warning by useEffect hook.
  useEffect(() => {
    getContact();
  }, []);

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getDeals = (payload) => {
    getList("contacts", payload)
      .then((data) => setDeals(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getQuotes = (payload) => {
    getList("deals", payload)
      .then((data) => setQuotes(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getTickets = (payload) => {
    getList("tickets", payload)
      .then((data) => setTickets(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getTasks = (payload) => {
    getList("tasks", payload)
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
        placeholder="Search"
        className="form-control"
        value={listingOptions.deals}
        onChange={(e) => handleSearch(e, "deals")}
      />

      <DealsTable deals={deals} />

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
        placeholder="Search"
        className="form-control"
        value={listingOptions.quotes}
        onChange={(e) => handleSearch(e, "quotes")}
      />

      <QuotesTable quotes={quotes} />

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
        placeholder="Search"
        className="form-control"
        value={listingOptions.tickets}
        onChange={(e) => handleSearch(e, "tickets")}
      />

      <TicketsTable tickets={tickets} />

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
        placeholder="Search"
        className="form-control"
        value={listingOptions.tasks}
        onChange={(e) => handleSearch(e, "tasks")}
      />

      <TasksTable tasks={tasks} />
    </Layout>
  );
};

export default Details;
