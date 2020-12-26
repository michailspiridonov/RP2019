import React, { Component } from 'react';
import { Header } from '../Header';

export class Delete extends Component {
  constructor(match) {
    super();
    this.state = {
      data: {}
    };
  }

  async componentDidMount() {
    const res = await fetch(`/paper/delete?id=${this.props.match.params.id}`);
    const data = await res.json();
    this.setState({ data })
  }

  render() {
    if (this.state.data.success) {
      return (
        <div>
          <Header />
          <h1 className="welcome-message">Success</h1>
          <h2 className="welcome-message">Paper with the id of {this.state.data.id} deleted</h2>
        </div>
      )
    } else {
      return (
        <div>
          <Header />
          <h1>Error</h1>
          <h2>{this.state.data.message}</h2>
        </div>
      )
    }
  }
}

export default Delete
