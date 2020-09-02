import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './Header';
import UserSettings from './UserSettings';

export class RemoveUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            selectedUser: '',
            users : [],
        }
    }

    async componentDidMount() {
        var res = await fetch(`/session`);
        var data = await res.json();
        if (data.loggedin) {
            this.setState({ user: data.username })
        }
        var res = await fetch(`/getusers`);
        var data = await res.json();
        this.setState({ users: data });
    }

    renderUser = ((user) =>
    <option value={user.username}>
        {user.username}
    </option>
  );

  delete = (e) => {
      e.preventDefault();
      fetch(`/paper/delete?id=${this.props.match.params.id}`).then(res => {
        res.json();
      }).then(data => {
        console.log(data);
      });
  }

    render() {
        if(!this.state.user){
            return(
                <div>
                    <Header/>
                <h1>Please login to view this page</h1>
                </div>
            )
        }
        if(!(this.state.user === 'admin')){
            return(
                <div>
                    <Header/>
                <h1>Only admin account can delete users</h1>
                </div>
            )
        }
        return (
            <div>
                <Header />
                <div className="user-removal">
                    <label for="users"></label>
                    <select name="users" onChange={e => this.setState({ selectedUser: e.target.value })}>
                        {this.state.users.map(user => this.renderUser(user))}
                    </select>
                    <button onClick={this.delete}>Submit</button>
                </div>
            </div>
        )
    }
}

export default RemoveUser
