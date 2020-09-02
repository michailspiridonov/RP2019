import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './Header';

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
        }
        if ((this.state.user === 'admin')) {
            const ures = await fetch(`/getusers`);
            const udata = await ures.json();
            console.log(udata);
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

    edit = (e) => {
        e.preventDefault();
        fetch(`/edituser?username=${this.state.selectedUser}`).then(res => res.json()).then(data => {
            console.log(data)
            if (!data) {
                this.editError('Error')
            }
            if (data.result) {
                this.editSuccess()
            } else {
                this.editError(data.message)
            }
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
                <div className="loading">
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
                        <label htmlFor="users"></label>
                        <select name="users" onChange={e => this.setState({ selectedUser: e.target.value })}>
                            <option value="" disabled selected>Please select user</option>
                            {this.state.users.map(user => this.renderUser(user))}
                        </select>
                        <button onClick={this.edit}>Submit</button>
                    </div>
                    <ToastContainer />
                </div>
            )
        } else if(this.state.user === 'admin') {
            return (
                <div>
                    <Header />
                    <h2>Editing {this.state.selectedUser}</h2>
                    <div className="login-page">
                        <form onSubmit={this.login} className="form">
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
        if (!this.state.selectedUser) {
            return (
                <div>
                    <Header />
                    <h2>Editing {this.state.user}</h2>
                    <div className="login-page">
                        <form onSubmit={this.login} className="form">
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
