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
            message: '',
            redirect: false
        }
    }

    async componentDidMount() {
        const res = await fetch(`/session`);
        const data = await res.json();
        if (data.loggedin) {
            this.setState({ user: data.username })
        }
    }

    addError = () => {
        toast.error(this.state.message);
    }

    addSuccess = () => {
        toast.success("Success!");
    }

    login = (e) => {
        e.preventDefault();
        const user = this.state;
        axios.post('/adduser', user, {}).then(res => {
            if (res.data.success) {
                this.setState({ redirect: '/usersettings', message: res.data.message });
                console.log(res.data)
                { this.addSuccess() }
            } else {
                this.setState({ message: res.data.message });
                { this.addError() }
                console.log(res.data)
            }
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: this.state.redirect
            }} />
        }
        if(!this.state.user){
            return(
                <div>
                    <Header/>
                <h1>Please login to view this page</h1>
                </div>
            )
        }
        return (
            <div>
                <Header />
                <form onSubmit={this.login}>
                    Username: <br />
                    <input required type="text" name="username" placeholder="username" onChange={e => this.setState({ [e.target.name]: e.target.value })} /> <br />
          Password: <br />
                    <input required type="password" name="password" onChange={e => this.setState({ [e.target.name]: e.target.value })} /> <br />
                    <input type="submit" value="Add User" />
                </form>
                <ToastContainer />
            </div>
        )
    }
}

export default AddUser
