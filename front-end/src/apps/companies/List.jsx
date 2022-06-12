import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListSearch from "../../components/ListSearch";
import getList from "../../services/getList";
import Layout from "./Layout";
import Table from "./Table";

const List = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [listingOptions, setListingOptions] = useState({
    size: 10,
    page: 1,
    sortDir: "desc",
    sortBy: "id",
    search: "",
  });

  // TODO: Re-arrange this function into common one or place it inside other file.
  const getCompanies = (payload) => {
    getList("companies", payload)
      .then((data) => setCompanies(data.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCompanies(listingOptions);
  }, [listingOptions]);

  const handleAddCompany = () => {
    navigate("/companies/add");
  };

  const handleSearch = (e) => {
    setListingOptions({ ...listingOptions, search: e.target.value });
  };

  return (
    <Layout>
      <div className="row align-items-center">
        <div className="col-md-8 text-start">
          <h1>Companies</h1>
        </div>
        <div className="col-md-4 text-end">
          <button className="btn btn-primary" onClick={handleAddCompany}>
            Add company
          </button>
        </div>
      </div>
      {/* Inline search on companies. */}
      <ListSearch search={listingOptions.search} handleSearch={handleSearch} />

      {/* A companies table. */}
      <Table companies={companies} />
      {/* TODO: Add pagination support. */}
    </Layout>
  );
};

export default List;
