import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

const List = () => {
  const navigate = useNavigate();

  const handleAddCompany = () => {
    navigate("/companies/add");
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

      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        className="form-control"
      />

      <table className="table table-bordered table-hover my-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Company name</th>
            <th>Created by</th>
            <th>Created on</th>
            <th>Updated by</th>
            <th>Updated on</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Microsoft, Inc.</td>
            <td>1</td>
            <td>2022-05-22 10:35:03</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
};

export default List;
