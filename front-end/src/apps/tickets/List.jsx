import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ListSearch from "../../components/ListSearch";
import constants from "../../constants";
import Layout from "./Layout";

const List = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [listingOptions, setListingOptions] = useState({
    size: 10,
    page: 1,
    sortDir: "desc",
    sortBy: "id",
    search: "",
  });

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getTickets = (payload) => {
    const { size, page, sortDir, sortBy, search } = payload;

    fetch(
      `${constants.API_ENDPOINT}/tickets?search=${search}&size=${size}&page=${page}&sortDir=${sortDir}&sortBy=${sortBy}`,
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

  useEffect(() => {
    getTickets(listingOptions);
  }, [listingOptions]);

  const handleAddTicket = () => {
    navigate("/tickets/add");
  };

  const handleSearch = (e) => {
    setListingOptions({ ...listingOptions, search: e.target.value });
  };

  return (
    <Layout>
      <div className="row align-items-center">
        <div className="col-md-8 text-start">
          <h1>Tickets</h1>
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-primary" onClick={handleAddTicket}>
            Add ticket
          </button>
        </div>
      </div>

      {/* Inline search on tickets. */}
      <ListSearch search={listingOptions.search} handleSearch={handleSearch} />

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
    </Layout>
  );
};

export default List;
