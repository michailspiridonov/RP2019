import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './Header';

export class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            username: '',
            password: '',
            confirmpassword: '',
            message: '',
            redirect: false,
            loading: true
        }
    }

    async componentDidMount() {
        const res = await fetch(`/session`);
        const data = await res.json();
        if (data.loggedin) {
            this.setState({
                user: data.username,
                loading: false
            })
        } else {
            this.setState({
                loading: false,
                redirect: '/'
            })
        }
    }

    addError = () => {
        toast.error(this.state.message);
    }

    passwordError = () => {
        toast.error(`Passwords don't match`);
    }

    addSuccess = () => {
        toast.success("Success!");
    }

    login = (e) => {
        e.preventDefault();
        const user = this.state;
        if (user.confirmpassword !== user.password) {
            this.passwordError()
        } else {
            axios.post('/adduser', user, {}).then(res => {
                if (res.data.success) {
                    this.setState({ redirect: '/user/settings', message: res.data.message });
                    console.log(res.data)
                    this.addSuccess()
                } else {
                    this.setState({ message: res.data.message });
                    this.addError()
                    console.log(res.data)
                }
            });
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: this.state.redirect
            }} />
        }
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
        return (
            <div className="login-page">
                <Header />
                <form onSubmit={this.login} className="form">
                    <label htmlFor="username">Username:</label>
                    <input required type="text" name="username" placeholder="Username" onChange={e => this.setState({ [e.target.name]: e.target.value })} /> <br />
                    <label htmlFor="username">Password:</label>
                    <input required type="password" name="password" placeholder="Password" onChange={e => this.setState({ [e.target.name]: e.target.value })} /> <br />
                    <label htmlFor="username">Confirm Password:</label>
                    <input required type="password" name="confirmpassword" placeholder="Confirm Password" onChange={e => this.setState({ [e.target.name]: e.target.value })} /> <br />
                    <input type="submit" value="Add User" />
                </form>
                <ToastContainer />
            </div>
        )
    }
}

export default AddUser
