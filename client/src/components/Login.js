import React, { Component } from 'react';
import axios from 'axios';

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      redirect: false
    }
  }

  login = (e) => {
    e.preventDefault();
    const user = this.state;
    axios.post('/login', user, {}).then(res => console.log(res));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          Username: <br/>
          <input required type="text" name="username" placeholder="username" onChange={e => this.setState({ [e.target.name]: e.target.value })}/> <br/>
          Password: <br/>
          <input required type="password" name="password" onChange={e => this.setState({ [e.target.name]: e.target.value })}/> <br/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    )
  }
}

export default Login
