const ListSearch = ({ search, handleSearch }) => {
  return (
    <input
      type="text"
      name="search"
      id="search"
      placeholder="Search"
      className="form-control"
      value={search}
      onChange={handleSearch}
    />
  );
};

export default ListSearch;
