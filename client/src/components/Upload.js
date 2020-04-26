import React, { Component } from 'react';
import axios from 'axios';

export class Upload extends Component {
  constructor() {
    super();
    this.onFileChange = this.onFileChange.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.state = {
       document: ''
    }
  }

  onFileChange(e) {
    this.setState({document: e.target.files[0]});
  }
  
  onUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('document', this.state.document);
    axios.post("/paper/upload", formData, {
    }).then(res => {
        console.log(res);
    });
  }

  render() {
    return (
      <div>
        <h1>File upload</h1>
        <input type="file" name="file upload" onChange={this.onFileChange}/>
        <button type="submit" onClick={this.onUpload}>Upload</button>
      </div>
    )
  }
}

export default Upload
