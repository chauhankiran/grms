import moment from "moment";
import { Link } from "react-router-dom";

const Table = ({ tasks }) => {
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
        {tasks.length > 0 &&
          tasks.map((task) => {
            return (
              <tr key={task.id}>
                <td>
                  <Link to={`/tasks/${task.id}`}>{task.id}</Link>
                </td>
                <td>
                  <Link to={`/tasks/${task.id}`}>{task.title}</Link>
                </td>
                {/* TODO: Display full name of the user. */}
                <td>{task.createdBy ? task.createdBy : "-"}</td>
                <td>
                  {task.createdOn ? moment(task.createdOn).fromNow() : "-"}
                </td>
                <td>{task.updatedBy ? task.updatedBy : "-"}</td>
                <td>
                  {task.updatedOn ? moment(task.updatedOn).fromNow() : "-"}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
