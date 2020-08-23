import React, { Component } from 'react';
import { Header } from './Header';

export class Download extends Component {
  constructor(match) {
    super();
    this.state = {
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
  });
  }
  render() {
    return (
      <div>
        <Header />
        <h1><i>Downloading...</i></h1>
      </div>
    )
  }
}

export default Download
