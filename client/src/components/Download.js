import React, { Component } from 'react';
import { Header } from './Header';
import { Redirect } from 'react-router-dom';

export class Download extends Component {
  constructor(match) {
    super();
    this.state = {
      redirect: false
    };
  }

  async componentDidMount() {
    await fetch(`/paper/download/${this.props.match.params.id}`).then(response => {
      response.blob().then(blob => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = `${this.props.match.params.title}.pdf`;
        a.click();
      });
  }).then( this.setState({redirect: '/papers'}) );
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: this.state.redirect,
      }} />
    }
    return (
      <div>
        <Header />
        <h1><i>Downloading...</i></h1>
      </div>
    )
  }
}

export default Download
