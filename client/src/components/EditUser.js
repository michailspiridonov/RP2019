import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './Header';
import axios from 'axios';

export class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            selectedUser: '',
            users: [],
            message: '',
            loading: true,
            oldPassword: '',
            newPassword: '',
            confirmationPassword: '',
            newUsername: ''
        }
    }

    editSuccess = () => {
        toast.success(`User ${this.state.selectedUser} successfully edited`);
    }

    editError = (message) => {
        toast.error(message);
    }

    async componentDidMount() {
        const sres = await fetch(`/session`);
        const sdata = await sres.json();
        if (sdata.loggedin) {
            this.setState({ user: sdata.username })
        } else {
            this.setState({
                loading: false,
                redirect: '/'
            })
        }
        if ((this.state.user === 'admin')) {
            const ures = await fetch(`/getusers`);
            const udata = await ures.json();    
            this.setState({ users: udata });
            this.setState({ loading: false });
        } else {
            this.setState({ loading: false });
        }
    }

    renderUser = ((user) =>
        <option value={user.username}>
            {user.username}
        </option>
    );

    changePassword = (e) => {
        e.preventDefault();
        const user = this.state;
        console.log(user)
        axios.post('/useredit', user, {method: 'post'}).then(res => {
            console.log(res.data);
        });
    }

    render() {
        if (!this.state.user) {
            return (
                <div>
                    <Header />
                    <h1>Please login to view this page</h1>
                </div>
            )
        }
        if (this.state.loading) {
            return (
                <div className="welcome-message">
                    <Header />
                    <h1>Loading...</h1>
                </div>
            )
        }
        if (!this.state.selectedUser && this.state.user === 'admin') {
            return (
                <div>
                    <Header />
                    <div className="user-removal">
                        <h2 htmlFor="users">Choose a user to edit:</h2>
                        <select name="users" className="users" onChange={e => this.setState({ selectedUser: e.target.value })}>
                            <option value="" disabled selected>Please select user</option>
                            {this.state.users.map(user => this.renderUser(user))}
                        </select>
                    </div>
                    <ToastContainer />
                </div>
            )
        } else if (this.state.user === 'admin') {
            return (
                <div>
                    <Header />
                    <div className="login-page">
                        <form onSubmit={this.login} name="form" className="form">
                            <h2 className="edit-message">Editing {this.state.selectedUser}</h2>
                            <label htmlFor="oldPassword">Old Password:</label>
                            <input required type="password" name="oldPassword" placeholder="Old Password" onChange={e => this.setState({ [e.target.name]: e.target.value })} /> <br />
                            <label htmlFor="newPassword">New Password:</label>
                            <input required type="password" name="newPassword" placeholder="New Password" onChange={e => this.setState({ [e.target.name]: e.target.value })} /> <br />
                            <label htmlFor="confirmationPassword">Confirm New Password:</label>
                            <input required type="password" name="confirmationPassword" placeholder="Confirm New Password" onChange={e => this.setState({ [e.target.name]: e.target.value })} /> <br />
                            <input type="submit" value="Change Password" onClick={this.changePassword}/>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
            )
        }
        if (!this.state.selectedUser) {
            return (
                <div>
                    <Header />
                    <div className="login-page">
                        <form onSubmit={this.login} className="form">
                            <h2 className="edit-message">Editing {this.state.user}</h2>
                            <label htmlFor="username">Username:</label>
                            <input required type="text" name="username" placeholder="username" onChange={e => this.setState({ [e.target.name]: e.target.value })} /> <br />
                            <label htmlFor="username">Password:</label>
                            <input required type="password" name="password" placeholder="password" onChange={e => this.setState({ [e.target.name]: e.target.value })} /> <br />
                            <label htmlFor="username">Confirm Password:</label>
                            <input required type="password" name="confirmpassword" placeholder="Confirm Password" onChange={e => this.setState({ [e.target.name]: e.target.value })} /> <br />
                            <input type="submit" value="Add User" />
                        </form>
                    </div>
                    <ToastContainer />
                </div>
            )
        }
    }
}

export default EditUser
