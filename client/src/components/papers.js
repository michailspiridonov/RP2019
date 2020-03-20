import React, { Component } from 'react';
import './papers.css';

class Papers extends Component {
  constructor() {
    super();
    this.state = {
      papers: []
    };
  }

  componentDidMount() {
    fetch('/papers')
      .then(res => res.json())
      .then(papers => this.setState({papers}, () => console.log('Papers fetched...', papers)));
  }

  render() {
    return (
      <div>
        <h2>Papers</h2>
        <ul>
        {this.state.papers.map(paper => 
          <li key={paper.id}>{paper.author} {paper.title} {paper.class} {paper.year} {paper.subject} {paper.mentor}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Papers;
