import moment from "moment";
import { Link } from "react-router-dom";

const Table = ({ tickets }) => {
  return (
    <table className="table table-bordered table-hover my-4">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Created by</th>
          <th>Created on</th>
          <th>Updated by</th>
          <th>Updated on</th>
        </tr>
      </thead>
      <tbody>
        {tickets.length > 0 &&
          tickets.map((ticket) => {
            return (
              <tr key={ticket.id}>
                <td>
                  <Link to={`/tickets/${ticket.id}`}>{ticket.id}</Link>
                </td>
                <td>
                  <Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                </td>
                {/* TODO: Display full name of the user. */}
                <td>{ticket.createdBy ? ticket.createdBy : "-"}</td>
                <td>
                  {ticket.createdOn ? moment(ticket.createdOn).fromNow() : "-"}
                </td>
                <td>{ticket.updatedBy ? ticket.updatedBy : "-"}</td>
                <td>
                  {ticket.updatedOn ? moment(ticket.updatedOn).fromNow() : "-"}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
