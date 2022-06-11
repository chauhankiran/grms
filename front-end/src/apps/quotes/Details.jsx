import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quote, setQuote] = useState({});
  const [tasks, setTasks] = useState([]);
  // May be if required, then divide into seperate state for each section.
  const [listingOptions, setListingOptions] = useState({
    size: 10,
    page: 1,
    sortDir: "desc",
    sortBy: "id",
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
    fetch(`${constants.API_ENDPOINT}/quotes/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setQuote(data.data))
      .catch((error) => console.log(error));
  };

  // TODO: Resolve the dep. warning by useEffect hook.
  useEffect(() => {
    getQuote();
  }, []);

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getTasks = (payload) => {
    const { size, page, sortDir, sortBy, tasks, quoteId } = payload;

    fetch(
      `${constants.API_ENDPOINT}/tasks?quoteId=${quoteId}&search=${tasks}&size=${size}&page=${page}&sortDir=${sortDir}&sortBy=${sortBy}`,
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
            className="btn btn-primary me-2"
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
