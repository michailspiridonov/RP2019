import React, { Component } from 'react';
import { Header } from './Header';

export class Logout extends Component {

  render() {
      return (
        <div>
          <Header />
          <h1><i>Logged out</i></h1>
        </div>
      )
  }
}

export default Logout
