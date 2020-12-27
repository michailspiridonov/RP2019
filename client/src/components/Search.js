import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Header } from './GUI/Header';

export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: '',
      title: '',
      class: '',
      year: 0,
      subject: '',
      mentor: '',
      keywords: '',
      papers: [],
      redirect: false
    }
  }

  searchPaper = (e) => {
    e.preventDefault();
    const paper = this.state;
    fetch(`/search?author=${paper.author}&title=${paper.title}&path=${paper.path}&class=${paper.class}&year=${paper.year}&subject=${paper.subject}&mentor=${paper.mentor}&keywords=${paper.keywords}`).then(res => {
      res.json().then(data => {
        this.setState({
          author: '',
          title: '',
          class: '',
          year: 0,
          subject: '',
          mentor: '',
          keywords: '',
          papers: data,
          redirect: '/search/results'
        });
      })
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: this.state.redirect,
        state: {
          papers: this.state.papers
        }
      }} />
    }
    return (
      <div>
        <Header />
        <div className="add-paper">
          <form onSubmit={this.searchPaper} className="add-form">
          <h2>Search</h2><br />
            Autor: <br />
            <input type="text" name="author" id="1" className="add-input" onChange={e => this.setState({ [e.target.name]: e.target.value })} />
            <br />
                Title: <br />
            <input type="text" name="title" id="2" className="add-input" onChange={e => this.setState({ [e.target.name]: e.target.value })} />
            <br />
                Class: <br />
            <input type="text" name="class" id="3" className="add-input" onChange={e => this.setState({ [e.target.name]: e.target.value })} />
            <br />
                Year: <br />
            <input type="text" name="year" id="4" className="add-input" onChange={e => this.setState({ [e.target.name]: e.target.value })} />
            <br />
                Subject: <br />
            <input type="text" name="subject" id="5" className="add-input" onChange={e => this.setState({ [e.target.name]: e.target.value })} />
            <br />
                Mentor: <br />
            <input type="text" name="mentor" id="6" className="add-input" onChange={e => this.setState({ [e.target.name]: e.target.value })} />
            <br />
                Keywords: <br />
            <input type="text" name="keywords" id="7" className="add-input" onChange={e => this.setState({ [e.target.name]: e.target.value })} />
            <br />
            <input type="submit" value="Search" />
          </form>
          {/* <Results data={this.state.papers}/> */}
        </div></div>
    )
  }
}

export default Search
