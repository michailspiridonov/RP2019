import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './Header';

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: false
    }
  }

  loginError = () => {
    toast.error("Error!\nBad Credentials");
  }

  loginSuccess = () => {
    toast.success("Success!");
  }

  login = (e) => {
    e.preventDefault();
    const user = this.state;
    axios.post('/login', user, {}).then(res => {
      if (res.data.login) {
        this.setState({ redirect: '/' });
        this.loginSuccess()
      } else {
        this.loginError()
      }
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: this.state.redirect
      }} />
    }
    return (
      <div className="login-page">
        <Header />
        <form onSubmit={this.login} className="form">
          Username: <br />
          <input required type="text" name="username" placeholder="username" onChange={e => this.setState({ [e.target.name]: e.target.value })} /> <br />
          Password: <br />
          <input required type="password" name="password" onChange={e => this.setState({ [e.target.name]: e.target.value })} /> <br />
          <button type="submit" value="Login">Login</button>
        </form>
        <ToastContainer />
      </div>
    )
  }
}

export default Login
