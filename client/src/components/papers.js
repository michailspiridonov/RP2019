import React, { Component } from 'react';

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
      .then(papers => this.setState({papers}));
  }

  renderPaper = (paper) => <div className="paper" key={paper.id}>{paper.title}</div>
  
  render() {
    return (
     <div className="Papers">
        {this.state.papers.map(paper => this.renderPaper(paper))}
     </div>
    );
  }
}

export default Papers;
