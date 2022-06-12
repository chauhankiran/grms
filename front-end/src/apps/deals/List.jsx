import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListSearch from "../../components/ListSearch";
import getList from "../../services/getList";
import Layout from "./Layout";
import Table from "./Table";

const List = () => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [listingOptions, setListingOptions] = useState({
    size: 10,
    page: 1,
    sortDir: "desc",
    sortBy: "id",
    search: "",
  });

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getDeals = (payload) => {
    getList("deals", payload)
      .then((data) => setDeals(data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getDeals(listingOptions);
  }, [listingOptions]);

  const handleDealContact = () => {
    navigate("/deals/add");
  };

  const handleSearch = (e) => {
    setListingOptions({ ...listingOptions, search: e.target.value });
  };

  return (
    <Layout>
      <div className="row align-items-center">
        <div className="col-md-8 text-start">
          <h1>Deals</h1>
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-primary" onClick={handleDealContact}>
            Add deal
          </button>
        </div>
      </div>

      {/* Inline search on deals. */}
      <ListSearch search={listingOptions.search} handleSearch={handleSearch} />

      {/* A deals table. */}
      <Table deals={deals} />

      {/* TODO: Add pagination support. */}
    </Layout>
  );
};

export default List;
