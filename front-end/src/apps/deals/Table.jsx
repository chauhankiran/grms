import moment from "moment";
import { Link } from "react-router-dom";

const Table = ({ deals }) => {
  return (
    <table className="table table-bordered table-hover my-4">
      <thead>
        <tr>
          <th>Id</th>
          <th>Deal name</th>
          <th>Created by</th>
          <th>Created on</th>
          <th>Updated by</th>
          <th>Updated on</th>
        </tr>
      </thead>
      <tbody>
        {deals.length > 0 &&
          deals.map((deal) => {
            return (
              <tr key={deal.id}>
                <td>
                  <Link to={`/deals/${deal.id}`}>{deal.id}</Link>
                </td>
                <td>
                  <Link to={`/deals/${deal.id}`}>{deal.name}</Link>
                </td>
                {/* TODO: Display full name of the user. */}
                <td>{deal.createdBy ? deal.createdBy : "-"}</td>
                <td>
                  {deal.createdOn ? moment(deal.createdOn).fromNow() : "-"}
                </td>
                <td>{deal.updatedBy ? deal.updatedBy : "-"}</td>
                <td>
                  {deal.updatedOn ? moment(deal.updatedOn).fromNow() : "-"}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
