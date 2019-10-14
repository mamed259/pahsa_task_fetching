import React from "react";
import './App.css';


export class App extends React.Component {
  state = {
    isLoading: true,
    users: [],
    todos: [],
    selectValue : 0
  };


  componentDidMount() {
    this.setState({
      isLoading: true
    });

    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/todos"),
      fetch("https://jsonplaceholder.typicode.com/users")
    ])
        .then(([resp1, resp2]) => {
          return Promise.all([resp1.json(), resp2.json()])
        })
        .then(([resp1, resp2]) => {
          this.setState(
              {
                todos: resp1,
                users: resp2,
                isLoading: true
              }
          )
        })
  }

    getTodo = id => {
        this.setState({
            isLoading: false
        });
        fetch("https://jsonplaceholder.typicode.com/todos?userId=" + id)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    todos: data,
                    isLoading: true
                })
            })
    };

  change = event => {
    this.setState({value: event.target.selectValue});
    this.getTodo(event.target.value)
  };


  render() {
    return (
        <div className="content">
          <div className="select-box">
            <select onChange={this.change} value={this.state.selectValue}>
              <option>All</option>
              {this.state.users.map(user => {
                return(
                    <option key={user.id} value={user.id}>{user.name}</option>
                )
              })}
            </select>
          </div>
          { this.state.isLoading
              ? <div>
                {
                  this.state.todos.map(user => {
                      const { id, title } = user;
                      return (
                            <div key={id}>
                                <span>{id} </span>
                                <span>{title}</span>
                            </div>
                      );
                  })
                }
              </div>
              : <div>Loading...</div>
          }
        </div>
    );
  }
}
export default App;
