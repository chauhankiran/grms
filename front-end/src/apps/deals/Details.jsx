import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./Layout";

import getList from "../../services/getList";
import getDetails from "../../services/getDetails";

import QuotesTable from "../quotes/Table";
import TicketsTable from "../tickets/Table";
import TasksTable from "../tasks/Table";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [deal, setDeal] = useState({});
  const [quotes, setQuotes] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [tasks, setTasks] = useState([]);
  // May be if required, then divide into seperate state for each section.
  const [listingOptions, setListingOptions] = useState({
    size: 10,
    page: 1,
    sortDir: "desc",
    sortBy: "id",
    quotes: "",
    tickets: "",
    tasks: "",
    dealId: id,
  });

  const handleEdit = (id) => {
    navigate(`/deals/${id}/edit`);
  };

  const handleAdd = (module) => {
    navigate(`/${module}/add`, {
      state: { fromPage: "deals", dealId: id },
    });
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getDeal = () => {
    getDetails("deals", id)
      .then((data) => setDeal(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Resolve the dep. warning by useEffect hook.
  useEffect(() => {
    getDeal();
  }, []);

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getTickets = (payload) => {
    getList("tickets", payload)
      .then((data) => setTickets(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getQuotes = (payload) => {
    getList("quotes", payload)
      .then((data) => setQuotes(data.data))
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
            onClick={() => handleEdit(deal.id)}
            className="btn btn-primary me-2"
          >
            Edit deal
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <span className="d-block fw-500">Deal name</span>
            <span className="d-block fs-4">{deal.name}</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Deal stage</span>
            <span className="d-block fs-5">{deal.stage}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Deal status</span>
            <span className="d-block fs-5">{deal.status}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Deal total</span>
            <span className="d-block fs-5">{deal.total}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Due date</span>
            <span className="d-block fs-5">{deal.dueDate}</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Close date</span>
            <span className="d-block fs-5">{deal.closeDate}</span>
          </div>
        </div>
      </div>

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
