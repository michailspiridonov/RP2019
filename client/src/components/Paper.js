import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Paper extends Component {
  constructor(match) {
    super();
    this.state = {
      paper: {}
    };
  }

  async componentDidMount() {
    const res = await fetch(`/paper/id/${this.props.match.params.id}`);
    const data = await res.json();
    this.setState({ paper: data[0] })
  }

  renderPaper = ((paper) =>
    <div>
      <h1>title: {paper.title}</h1>
      <h2>Author: {paper.author}</h2>
      <h3>Class: {paper.class}</h3>
      <h3>Id: {paper.id}</h3>
      <Link to={`/delete/${paper.id}`}>
        <h3>Delete paper</h3>
      </Link>
    </div>
  );

  render() {
    return (
      <div>
        <div className="paper-detail">{this.renderPaper(this.state.paper)}</div>
      </div>
    );
  }
}

export default Paper;
