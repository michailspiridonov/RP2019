import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../Header';

class Paper extends Component {
  constructor(match) {
    super();
    this.state = {
      paper: {},
      user: '',
      loading: true
    };
  }

  async componentDidMount() {
    var res = await fetch(`/paper/id/${this.props.match.params.id}`);
    var data = await res.json();
    this.setState({
      paper: data[0],
      loading: false
    });
    res = await fetch(`/session`);
    data = await res.json();
    if (data.loggedin) {
      this.setState({
        user: data.username,
        loading: false
      })
    }
  }

  deletedMessage = () => {
    toast('deleted');
  }

  renderPaperLoggedIn = ((paper) =>
    <div className="paper-info-text">
      <h1 className="paper-title">{paper.title}</h1>
      <div className="paper-container">
        <h2 className="paper-author">{paper.author}</h2>
        <h2 className="paper-year">{paper.year}</h2>
      </div>
      <h2 className="paper-subject">{paper.subject}</h2>
      <div className="paper-buttons">
          <Link to={`/delete/${paper.id}`}>
             <a className="btn-main">Delete</a>
          </Link>
          <Link to={`/download/${paper.id}/${paper.title}`}>
          <a className="btn-main">Download</a>
          </Link>
      </div>
      <li className="paper-details">
        <ul>Class: {paper.class}</ul>
        <ul>Mentor: {paper.mentor}</ul>
      </li>
    </div>
  );

  renderPaper = ((paper) =>
    <div className="paper-info-text">
      <h1 className="paper-title">{paper.title}</h1>
      <div className="paper-container">
        <h2 className="paper-author">{paper.author}</h2>
        <h2 className="paper-year">{paper.year}</h2>
      </div>
      <h2 className="paper-subject">{paper.subject}</h2>
      <div className="paper-buttons">
          <Link to={`/download/${paper.id}/${paper.title}`}>
            <a className="btn-main">Download</a>
          </Link>
      </div>
      <li className="paper-details">
        <ul>Class: {paper.class}</ul>
        <ul>Mentor: {paper.mentor}</ul>
      </li>
    </div>
  );

  render() {
    if (this.state.loading) {
      return (
        <div>
          <Header />
          <h1 className="welcome-message">Loading...</h1>
        </div>
      )
    }
    if (this.state.paper === undefined) {
      return (
        <div>
          <Header />
          <h1 className="no-paper-error">Paper not found</h1>
        </div>
      )
    }
    if (this.state.user) {
      return (
        <div>
          <Header />
          <div className="paper-detail">{this.renderPaperLoggedIn(this.state.paper)}</div>
          <ToastContainer />
        </div>
      );
    }
    return (
      <div>
        <Header />
        <div className="paper-detail">{this.renderPaper(this.state.paper)}</div>
        <ToastContainer />
      </div>
    );
  }
}

export default Paper;
