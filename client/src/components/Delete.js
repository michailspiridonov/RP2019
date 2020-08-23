import React, { Component } from 'react';
import { Header } from './Header';

export class Delete extends Component {
  constructor(match) {
    super();
    this.state = {
      data : {}
    };
  }

  async componentDidMount() {
    const res = await fetch(`/paper/delete?id=${this.props.match.params.id}`);
    const data = await res.json();
    this.setState({ data })
  }

  render() {
    return (
      <div>
        <Header />
        <h1>{this.state.data.result}</h1>
    <h2>Paper with the id of {this.state.data.id} deleted</h2>
      </div>
    )
  }
}

export default Delete
