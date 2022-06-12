import moment from "moment";
import { Link } from "react-router-dom";

const Table = ({ companies }) => {
  return (
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
        {companies.length > 0 &&
          companies.map((company) => {
            return (
              <tr key={company.id}>
                <td>
                  <Link to={`/companies/${company.id}`}>{company.id}</Link>
                </td>
                <td>
                  <Link to={`/companies/${company.id}`}>{company.name}</Link>
                </td>
                {/* TODO: Display full name of the user. */}
                <td>{company.createdBy ? company.createdBy : "-"}</td>
                <td>
                  {company.createdOn
                    ? moment(company.createdOn).fromNow()
                    : "-"}
                </td>
                <td>{company.updatedBy ? company.updatedBy : "-"}</td>
                <td>
                  {company.updatedOn
                    ? moment(company.updatedOn).fromNow()
                    : "-"}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
