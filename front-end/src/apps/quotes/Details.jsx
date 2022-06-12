import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./Layout";

import getList from "../../services/getList";
import getDetails from "../../services/getDetails";

import TicketsTable from "../tickets/Table";
import TasksTable from "../tasks/Table";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quote, setQuote] = useState({});
  const [tickets, setTickets] = useState([]);
  const [tasks, setTasks] = useState([]);
  // May be if required, then divide into seperate state for each section.
  const [listingOptions, setListingOptions] = useState({
    size: 10,
    page: 1,
    sortDir: "desc",
    sortBy: "id",
    tickets: "",
    tasks: "",
    quoteId: id,
  });

  const handleEdit = (id) => {
    navigate(`/quotes/${id}/edit`);
  };

  const handleAdd = (module) => {
    navigate(`/${module}/add`, {
      state: { fromPage: "quotes", quoteId: id },
    });
  };

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getQuote = () => {
    getDetails("quotes", id)
      .then((data) => setQuote(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Resolve the dep. warning by useEffect hook.
  useEffect(() => {
    getQuote();
  }, []);

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
            onClick={() => handleEdit(quote.id)}
            className="btn btn-primary"
          >
            Edit quote
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="mb-3">
            <span className="d-block fw-500">Quote name</span>
            <span className="d-block fs-4">{quote.name}</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Quote total</span>
            <span className="d-block fs-5">{quote.total}</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <span className="d-block fw-500">Expire date</span>
            <span className="d-block fs-5">{quote.expireOn}</span>
          </div>
        </div>
      </div>

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
