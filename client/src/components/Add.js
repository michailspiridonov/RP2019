import React, { Component } from 'react'
import Upload from './Upload';

export class Add extends Component {
  constructor(props) {
    super(props)

    this.state = {
      paper: {
        author: '',
        title: '',
        class: '',
        year: 0,
        suject: '',
        mentor: '',
      }
    }
  }

  addPaper = (e) => {
    const paper = this.state;
    console.log(paper)
    fetch(`/paper/add?author=${paper.author}&title=${paper.title}&path=test&class=${paper.class}&year=${paper.year}&subject=${paper.suject}&mentor=${paper.mentor}`);
    this.setState({
      paper: {
        author: '',
        title: '',
        clas: '',
        year: 0,
        suject: '',
        mentor: '',
      }
    });
  }

  render() {
    const paper = this.state;
    return (
      <div>
        <form onSubmit={this.addPaper}>
          <input type="text" name="author" placeholder="Author"             onChange={e => this.setState({ ...paper, author: e.target.value })} />
          <input type="text" name="title" placeholder="Title"               onChange={e => this.setState({ ...paper, title: e.target.value })} />
          <input type="text" name="class" maxLength="1" placeholder="Class" onChange={e => this.setState({ ...paper, class: e.target.value })} />
          <input type="number" name="year" maxLength="4" placeholder="Year" onChange={e => this.setState({ ...paper, year: e.target.value })} />
          <input type="text" name="suject" placeholder="Subject"            onChange={e => this.setState({ ...paper, suject: e.target.value })} />
          <input type="text" name="mentor" placeholder="Mentor"             onChange={e => this.setState({ ...paper, mentor: e.target.value })} />
          <input type="submit" value="Add paper"/>
        </form>
        <hr />
        <p>{paper.title}</p>
        <p>{paper.author}</p>
        <p>{paper.class}</p>
        <p>{paper.year}</p>
        <p>{paper.suject}</p>
        <p>{paper.mentor}</p>
        <Upload/>
      </div>
    )
  }
}

export default Add

