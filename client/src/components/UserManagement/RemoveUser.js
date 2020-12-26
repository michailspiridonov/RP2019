import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../Header';

export class RemoveUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            selectedUser: '',
            users: [],
            message: '',
            loading: true
        }
    }

    deleteSuccess = () => {
        toast.success(`User ${this.state.selectedUser} successfully deleted`);
    }

    deleteError = (message) => {
        toast.error(message);
    }

    async componentDidMount() {
        const sres = await fetch(`/session`);
        const sdata = await sres.json();
        if (sdata.loggedin) {
            this.setState({ user: sdata.username })
        }
        const ures = await fetch(`/getusers`);
        const udata = await ures.json();
        this.setState({ users: udata });
        this.setState({ loading: false });
    }

    renderUser = ((user) =>
        <option value={user.username}>
            {user.username}
        </option>
    );

    delete = (e) => {
        e.preventDefault();
        if (this.state.selectedUser === '') {
            this.deleteError('Please select a user');
        } else {
            fetch(`/deleteuser?username=${this.state.selectedUser}`).then(res => res.json()).then(data => {
                console.log(data)
                if (!data) {
                    this.deleteError('Error')
                }
                if (data.result) {
                    this.deleteSuccess()
                    setTimeout(() => {
                        fetch(`/getusers`).then(res => res.json().then(data => {
                            console.log(data);
                            this.setState({ users: data });
                            this.setState({ loading: false });
                        }))
                    }, 1000);
                } else {
                    this.deleteError(data.message)
                }
            });
        }
    }

    render() {
        if (!this.state.user) {
            return (
                <div>
                    <Header />
                    <h1 className="welcome-message">Please login to view this page</h1>
                </div>
            )
        }
        if (!(this.state.user === 'admin')) {
            return (
                <div>
                    <Header />
                    <h1 className="welcome-message">Only admin account can delete users</h1>
                </div>
            )
        }
        if (this.state.loading) {
            return (
                <div>
                    <Header />
                    <h1 className="welcome-message">Loading...</h1>
                </div>
            )
        }
        return (
            <div>
                <Header />
                <div className="user-removal">
                    <h2 htmlFor="users">Choose a user to delete:</h2>
                    <select name="users" className="users" onChange={e => this.setState({ selectedUser: e.target.value })}>
                        <option value="" disabled selected>Please select user</option>
                        {this.state.users.map(user => this.renderUser(user))}
                    </select>
                </div>
                <button className="remove-user-btn" onClick={this.delete}>Submit</button>
                <ToastContainer />
            </div>
        )
    }
}

export default RemoveUser
