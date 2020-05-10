import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Papers extends Component {
  constructor() {
    super();
    this.state = {
      papers: []
    };
  }

  async componentDidMount() {
    const res = await fetch('/papers/');
    const data = await res.json();
    this.setState({ papers: data });
  }

  renderPaper = ((paper) =>
    <Link to={`/paper/${paper.id}`} key={paper.id}>
      <li className="paper">
        <div className="paper-text">
          <h3 className="">{paper.title}</h3>
          <p className="">{paper.author}</p>
          <p className="">{paper.subject}</p>
        </div>
      </li>
    </Link>
  );

  render() {
    return (
      <div>
        <ul className="papers">
          {this.state.papers.map(paper => this.renderPaper(paper))}
        </ul>
      </div>
    );
  }
}

export default Papers;
