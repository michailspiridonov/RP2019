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
    <div className="paper-info-text">
      <h1 className="paper-title">{paper.title}</h1>
      <h2 className="paper-year">{paper.year}</h2>
      <h2 className="paper-subject">{paper.subject}</h2>
      <div className="paper-buttons">
      <button>
      <Link to={`/delete/${paper.id}`}>
        <h3>Delete paper</h3>
      </Link>
      </button>
      <button>
      <Link to={`/download/${paper.id}/${paper.title}`}>
        <h3 >Download</h3>
      </Link>
      </button>
      </div>
      <li className="paper-details">
        <ul>Class: {paper.class}</ul>
        <ul>Mentor: {paper.mentor}</ul>
      </li>
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
