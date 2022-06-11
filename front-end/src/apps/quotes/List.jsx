import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import constants from "../../constants";
import Layout from "./Layout";

const List = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [listingOptions, setListingOptions] = useState({
    size: 10,
    page: 1,
    sortDir: "desc",
    sortBy: "id",
    search: "",
  });

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getQuotes = (payload) => {
    const { size, page, sortDir, sortBy, search } = payload;

    fetch(
      `${constants.API_ENDPOINT}/quotes?search=${search}&size=${size}&page=${page}&sortDir=${sortDir}&sortBy=${sortBy}`,
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

  useEffect(() => {
    getQuotes(listingOptions);
  }, [listingOptions]);

  const handleAddQuote = () => {
    navigate("/quotes/add");
  };

  const handleSearch = (e) => {
    setListingOptions({ ...listingOptions, search: e.target.value });
  };

  return (
    <Layout>
      <div className="row align-items-center">
        <div className="col-md-8 text-start">
          <h1>Quotes</h1>
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-primary" onClick={handleAddQuote}>
            Add quote
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
                  {/* TODO: Time should be in human readable form using moment e.g. 2 hours ago */}
                  <td>{quote.createdOn ? quote.createdOn : "-"}</td>
                  <td>{quote.updatedBy ? quote.updatedBy : "-"}</td>
                  <td>{quote.updatedOn ? quote.updatedOn : "-"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Layout>
  );
};

export default List;
