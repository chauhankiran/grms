import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListSearch from "../../components/ListSearch";
import getList from "../../services/getList";
import Layout from "./Layout";
import Table from "./Table";

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
    getList("tickets", payload)
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

      {/* A tickets table. */}
      <Table tickets={tickets} />

      {/* TODO: Add pagination support. */}
    </Layout>
  );
};

export default List;
