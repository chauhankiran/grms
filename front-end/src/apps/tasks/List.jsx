import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const List = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [listingOptions, setListingOptions] = useState({
    size: 10,
    page: 1,
    sortDir: "desc",
    sortBy: "id",
    search: "",
  });

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getTasks = (payload) => {
    const { size, page, sortDir, sortBy, search } = payload;

    fetch(
      `${constants.API_ENDPOINT}/tasks?search=${search}&size=${size}&page=${page}&sortDir=${sortDir}&sortBy=${sortBy}`,
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

  useEffect(() => {
    getTasks(listingOptions);
  }, [listingOptions]);

  const handleAddTask = () => {
    navigate("/tasks/add");
  };

  const handleSearch = (e) => {
    setListingOptions({ ...listingOptions, search: e.target.value });
  };

  return (
    <Layout>
      <div className="row align-items-center">
        <div className="col-md-8 text-start">
          <h1>Tasks</h1>
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-primary" onClick={handleAddTask}>
            Add task
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
                  {/* TODO: Time should be in human readable form using moment e.g. 2 hours ago */}
                  <td>{task.createdOn ? task.createdOn : "-"}</td>
                  <td>{task.updatedBy ? task.updatedBy : "-"}</td>
                  <td>{task.updatedOn ? task.updatedOn : "-"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
};

export default List;
