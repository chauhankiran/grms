import moment from "moment";
import { Link } from "react-router-dom";

const Table = ({ contacts }) => {
  return (
    <table className="table table-bordered table-hover my-4">
      <thead>
        <tr>
          <th>Id</th>
          <th>Contact name</th>
          <th>Created by</th>
          <th>Created on</th>
          <th>Updated by</th>
          <th>Updated on</th>
        </tr>
      </thead>
      <tbody>
        {contacts.length > 0 &&
          contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <Link to={`/contacts/${contact.id}`}>{contact.id}</Link>
                </td>
                <td>
                  <Link to={`/contacts/${contact.id}`}>
                    {contact.firstName + " " + contact.lastName}
                  </Link>
                </td>
                {/* TODO: Display full name of the user. */}
                <td>{contact.createdBy ? contact.createdBy : "-"}</td>
                <td>
                  {contact.createdOn
                    ? moment(contact.createdOn).fromNow()
                    : "-"}
                </td>
                <td>{contact.updatedBy ? contact.updatedBy : "-"}</td>
                <td>
                  {contact.updatedOn
                    ? moment(contact.updatedOn).fromNow()
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
