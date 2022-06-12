import moment from "moment";
import { Link } from "react-router-dom";

const Table = ({ quotes }) => {
  return (
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
                <td>
                  {quote.createdOn ? moment(quote.createdOn).fromNow() : "-"}
                </td>
                <td>{quote.updatedBy ? quote.updatedBy : "-"}</td>
                <td>
                  {quote.updatedOn ? moment(quote.updatedOn).fromNow() : "-"}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
