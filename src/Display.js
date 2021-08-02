import React from "react";
import "./Display.css";

class Display extends React.Component {
  render() {
    return (
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="row"
      >
        <table className="table table-primary table-striped">
          <thead>
            <tr>
              <th>Due Date</th>
              <th>Task</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.props.todos.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.dueDate}</td>
                  <td>{val.task}</td>
                  <td>{val.description}</td>
                  <td>
                    <button onClick={() => this.props.editEntry(val)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => this.props.deleteEntry(val)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Display;
