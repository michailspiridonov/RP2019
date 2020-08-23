import React, { Component } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';

export class Add extends Component {
  constructor(props) {
    super(props)

    this.onFileChange = this.onFileChange.bind(this);
    this.onUpload = this.onUpload.bind(this);

    this.state = {
      author: '',
      title: '',
      path: '',
      class: '',
      year: 0,
      subject: '',
      mentor: '',
      keywords: '',
      document: '',
      result: '',
      redirect: false
    }
  }

  fileTypeError = () => {
    toast.error("Error!\nOnly documents with .pdf extension are allowed");
  }

  successfullyUploaded = (title) => {
    toast.success(`${title} successfully added`);
  }

  onFileChange(e) {
    this.setState({ document: e.target.files[0] });
  }
  addError = () => {
    toast.error("Error uploading paper");
  }

  onUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('document', this.state.document);
    axios.post("/paper/upload", formData, {
    }).then(res => {
      var keywords = '';
      let i;
      for (i = 0; i < res.data.keywords.length; i++) {
        keywords = keywords + res.data.keywords[i] + ';\n'
      }
      keywords = keywords.replace(/,/g, ' ');
      this.setState({
        author: res.data.author,
        title: res.data.title,
        path: res.data.path,
        class: res.data.class,
        year: parseInt(res.data.year),
        subject: res.data.subject,
        mentor: res.data.mentor,
        keywords: keywords,
        result: true
      });
    }).catch(err => {
      this.setState({ result: false });
    });
  }

  addPaper = (e) => {
    e.preventDefault();
    var err = false;
    const paper = this.state;
    fetch(`/paper/add?author=${paper.author}&title=${paper.title}&path=${paper.path}&class=${paper.class}&year=${paper.year}&subject=${paper.subject}&mentor=${paper.mentor}&keywords=${paper.keywords}`)
      .then(res => res.json()).then(data =>{
        if(!data){
          console.log(data)
          this.addError();
        } else {
          console.log(data)
          this.successfullyUploaded(data.title);
        }
      })
    if(err){
      console.log("sdfgstge" + err)
      this.setState({
        author: '',
        title: '',
        class: '',
        year: 0,
        subject: '',
        mentor: '',
        keywords: '',
        document: '',
        redirect: '/papers'
      });
    } else {
      this.setState({
        author: '',
        title: '',
        class: '',
        year: 0,
        subject: '',
        mentor: '',
        keywords: '',
        document: ''
      });
    }
  }

  render() {
    if(this.state.redirect){
      return <Redirect to={{
        pathname: this.state.redirect,
        state: {
          papers: this.state.papers
        }
    }}/>
    }
    const paper = this.state;
    if (paper.result === false) {
      console.log(paper.result);
      {this.fileTypeError()}
    }
    return (
      <div className="add-paper">
        <form onSubmit={this.addPaper} className="add-form">
          Author:<br />
          <input type="text" name="author" placeholder="Author" value={paper.author} className="add-input" onChange={e => this.setState({ [e.target.name]: e.target.value })} />
          <br />
          Title: <br />
          <input type="text" name="title" placeholder="Title" value={paper.title} className="add-input" onChange={e => this.setState({ [e.target.name]: e.target.value })} />
          <br />
          Class: <br />
          <input type="text" name="class" maxLength="1" placeholder="Class" value={paper.class} className="add-input" onChange={e => this.setState({ [e.target.name]: e.target.value })} />
          <br />
          Year: <br />
          <input type="number" name="year" maxLength="4" placeholder="Year" value={paper.year} className="add-input" onChange={e => this.setState({ [e.target.name]: e.target.value })} />
          <br />
          Subject: <br />
          <input type="text" name="subject" placeholder="Subject" value={paper.subject} className="add-input" onChange={e => this.setState({ [e.target.name]: e.target.value })} />
          <br />
          Mentor: <br />
          <input type="text" name="mentor" placeholder="Mentor" value={paper.mentor} className="add-input" onChange={e => this.setState({ [e.target.name]: e.target.value })} />
          <br />
          Keywords: <br />
          <textarea type="text" name="keywords" placeholder="Keywords" value={paper.keywords} style={{ width: '400px', height: '75px' }} onChange={e => this.setState({ [e.target.name]: e.target.value })} />
          <br />
          <input type="submit" value="Add paper" />
        </form>
        <div>
          <h1>File upload</h1>
          <input type="file" name="file upload" onChange={this.onFileChange} />
          <button type="submit" onClick={this.onUpload}>Upload</button>
          <ToastContainer/>
        </div>
      </div>
    )
  }
}

export default Add

