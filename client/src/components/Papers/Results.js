import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../Header';

export class Results extends Component {
  renderResults = ((paper) =>
    <Link to={`/paper/${paper.id}`} key={paper.id}>
      <div className="paper">
        <div className="paper-text">
          <h3 className="">{paper.title}</h3>
          <p className="">{paper.author}</p>
          <p className="">{paper.subject}</p>
        </div>
      </div>
    </Link>
  );

  render() {
    if(!this.props.location.state.papers.length){
      return (
        <div>
        <Header />
        <h1 className="no-paper-error">No papers found</h1>
        </div>
      )
    }
    return (
      <div>
        <Header />
        <h1 className="result-text">Search results:</h1><br />
        <div className="papers">
          {this.props.location.state.papers.map(paper => this.renderResults(paper))}
        </div>
      </div>
    )
  }
}

export default Results
