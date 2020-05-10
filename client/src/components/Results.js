import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Results extends Component {
  renderResults = ((paper) =>
  <Link to={`/paper/${paper.id}`} key={paper.id}>
  <li className="paper">
    <h3 className="paper-title">{paper.title}</h3>
    <p className="paper-author">{paper.author}</p>
  </li>
  </Link>
);
  
  render() {
    return (
      <div className="results">
        <h1>Search results:</h1><br/>
        <ul>
          {this.props.location.state.papers.map(paper => this.renderResults(paper))}
        </ul>
      </div>
    )
  }
}

export default Results
