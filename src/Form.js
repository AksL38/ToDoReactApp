import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.currentEntry;
  }

  static getDerivedStateFromProps(props, currState) {
    if (props.currentEntry.id !== currState.id) {
      return { ...props.currentEntry };
    }

    return null;
  }

  onChange = ({ target: { name, value } }) => {
    let errors = { ...this.state.errors };

    switch (name) {
      case "dueDate":
        if (new Date(value) < new Date()) {
          errors.dueDate = "Due date must be in future!";
        } else {
          errors.dueDate = "";
        }
        break;
      case "task":
        if (value === "") {
          errors.task = "Task field can not be empty";
        } else {
          errors.task = "";
        }
        break;
      case "description":
        if (value === "") {
          errors.description = "Description field can not be empty";
        } else {
          errors.description = "";
        }
        break;

      default:
    }

    this.setState({ [name]: value, errors }, this.validate);
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.submitInfo({ ...this.state });
    this.setState({
      dueDate: "",
      task: "",
      description: "",
      allowSubmit: false,
      id: "",
      errors: {
        dueDate: "",
        task: "",
        description: "",
      },
    });
  };

  validate = () => {
    if (
      this.state.dueDate !== "" &&
      this.state.task !== "" &&
      this.state.description !== ""
    ) {
      if (
        this.state.errors.dueDate === "" &&
        this.state.errors.task === "" &&
        this.state.errors.description === ""
      ) {
        this.setState({ allowSubmit: true });
      } else {
        this.setState({ allowSubmit: false });
      }
    } else {
      this.setState({ allowSubmit: false });
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.onSubmit} className="bg-info">
          <div>
            <label className="form-label">Due Date</label> <br />
            <input
              type="Date"
              name="dueDate"
              value={this.state.dueDate}
              onChange={this.onChange}
            ></input>{" "}
            <br />
            <span>{this.state.errors.dueDate}</span>
          </div>
          <br />
          <div>
            <label className="form-label">Task</label> <br />
            <input
              type="text"
              name="task"
              value={this.state.task}
              onChange={this.onChange}
            ></input>{" "}
            <br />
            <span>{this.state.errors.task}</span>
          </div>
          <br />
          <div>
            <label className="form-label">Description</label> <br />
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
            ></input>{" "}
            <br />
            <span>{this.state.errors.description}</span>
          </div>
          <br />
          <input
            type="submit"
            value="Submit"
            disabled={!this.state.allowSubmit}
          ></input>
        </form>
        <br />
        <br />
      </>
    );
  }
}

export default Form;
