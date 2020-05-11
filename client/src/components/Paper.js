import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

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

  deletedMessage = () => {
    toast('deleted');
  }

  renderPaper = ((paper) =>
    <div className="paper-info-text">
      <h1 className="paper-title">{paper.title}</h1>
      <div className="paper-container">
      <h2 className="paper-author">{paper.author}</h2>
      <h2 className="paper-year">{paper.year}</h2>
      </div>
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
    if (this.state.paper == undefined) {
      return (
        <h1 className="no-paper-error">Paper not found</h1>
      )
    }
    return (
      <div>
        <div className="paper-detail">{this.renderPaper(this.state.paper)}</div>
        <ToastContainer />
      </div>
    );
  }
}

export default Paper;
