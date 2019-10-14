import React from "react";
import './App.css';


export class App extends React.Component {
  state = {
    isLoading: true,
    users: [],
    error: null
  };

  fetchUsers() {
    fetch(`https://jsonplaceholder.typicode.com/todos`)
        .then(response => response.json())
        .then(data =>
            this.setState({
              users: data,
              isLoading: false,
            })
        )
        .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchUsers();
  }
  render() {
    const { isLoading, users, error } = this.state;
    return (
        <React.Fragment>
          {error ? <p>{error.message}</p> : null}
          {!isLoading ? (
              users.map(user => {
                const { id, title } = user;
                return (
                    <div key={id}>
                      <span>{id} </span>
                      <span> {title}</span>
                    </div>
                );
              })
          ) : (
              <h3>Loading...</h3>
          )}
        </React.Fragment>
    );
  }
}
export default App;
