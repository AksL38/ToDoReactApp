import "./App.css";
import Display from "./Display";
import Form from "./Form";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      currentEntry: {
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
      },
      numTodos: 0,
    };
  }

  collectFormInfo = (values) => {
    let newList = [...this.state.todos];
    let curNum = this.state.numTodos;
    if (values.id === "") {
      newList.push({ ...values, id: curNum + 1 });
      curNum++;
    } else {
      let index = newList.findIndex((val) => val.id === values.id);
      newList[index] = values;
    }
    this.setState({
      todos: newList,
      currentEntry: {
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
      },
      numTodos: curNum,
    });
  };

  editEntry = (entry) => {
    this.setState({ currentEntry: entry });
  };

  deleteEntry = (entry) => {
    let newList = [...this.state.todos];
    let curNum = this.state.numTodos;
    let index = newList.findIndex((val) => val.id === entry.id);
    newList.splice(index, 1);
    curNum--;
    this.setState({
      todos: newList,
      currentEntry: {
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
      },
      numTodos: curNum,
    });
  };

  render() {
    return (
      <div className="container">
        <Form
          currentEntry={this.state.currentEntry}
          submitInfo={this.collectFormInfo}
        />
        <Display
          todos={this.state.todos}
          editEntry={this.editEntry}
          deleteEntry={this.deleteEntry}
        />
      </div>
    );
  }
}

export default App;
