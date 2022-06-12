import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListSearch from "../../components/ListSearch";
import getList from "../../services/getList";

import Layout from "./Layout";
import Table from "./Table";
import Pagination from "./Pagination";

const List = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  // TODO: Do we need diff. state for this?
  const [count, setCount] = useState(0);
  const [listingOptions, setListingOptions] = useState({
    size: 10,
    page: 1,
    sortDir: "desc",
    sortBy: "id",
    search: "",
  });

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getQuotes = (payload) => {
    getList("quotes", payload)
      .then((data) => {
        setQuotes(data.data);
        setCount(data.count);
      })
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

  // Supportive functions for paginations.
  const handleNext = () => {
    setListingOptions({ ...listingOptions, page: listingOptions.page + 1 });
  };
  const handlePrev = () => {
    setListingOptions({ ...listingOptions, page: listingOptions.page - 1 });
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

      {/* Inline search on quotes. */}
      <ListSearch search={listingOptions.search} handleSearch={handleSearch} />

      {/* A quotes table. */}
      <Table quotes={quotes} />

      {/* Pagination. */}
      <Pagination
        page={listingOptions.page}
        size={listingOptions.size}
        count={count}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </Layout>
  );
};

export default List;
