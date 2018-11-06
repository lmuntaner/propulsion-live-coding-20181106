import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { getFeed } from './store/actions';

class App extends Component {

  state = {
    email: '',
    password: '',
  };

  render() {
    return (
      <div className="App">
        {
          this.props.isUserLoggedIn
          ? false
          : <form onSubmit={ this.login }>
            <input
              type="text"
              placeholder="Enter email..."
              onChange={ this.handleEmailChange }
              value={ this.state.email }
            />
            <input
              type="password"
              placeholder="Enter password.."
              onChange={ this.handlePasswordChange }
              value={ this.state.password }
            />
            <button>Log in</button>
          </form>
        }
        <button onClick={ this.getFeed } disabled={ !this.props.isUserLoggedIn }>Get feed</button>
      </div>
    );
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.currentTarget.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.currentTarget.value });
  }

  getFeed = () => {
    if (this.props.isUserLoggedIn) {
      return this.props.dispatch(getFeed());
    }
    alert('You are not logged in!');
  }

  login = (event) => {
    event.preventDefault();
    const url = 'https://propulsion-blitz.herokuapp.com/api/login';
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    const options = {
      headers: headers,
      method: 'POST',
      body: JSON.stringify(data),
    };
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        this.setState({
          email: '',
          password: '',
        });
        this.props.dispatch({
          type: 'setUser',
          payload: {
            user: user,
          },
        });
        localStorage.setItem('token', user.token);
      })

  }
}

const mapStateToProps = (state) => {
  if (state.user) {
    return {
      isUserLoggedIn: state.user.token ? true : false,
    };
  }
  return {
    isUserLoggedIn: false,
  };
}

export default connect(mapStateToProps)(App);
