import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../GUI/Header';

export class UserSettings extends Component {

    constructor() {
        super();
        this.state = {
            user: '',
        };
    }

    async componentDidMount() {
        const res = await fetch(`/session`);
        const data = await res.json();
        if (data.loggedin) {
            this.setState({ user: data.username })
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
        if (this.state.user === 'admin') {
            return (
                <React.Fragment>
                    <Header />
                    <h2 className="welcome-message">Welcome {this.state.user}</h2>
                    <div className="user-buttons">
                        <Link to={`/user/add`}>
                            <a className="btn-main">Add user</a>
                        </Link>
                        <Link to={`/user/remove`}>
                            <a className="btn-main">Delete user</a>
                        </Link>
                        <Link to={`/user/edit`}>
                            <a className="btn-main">Edit user</a>
                        </Link>
                    </div>
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <Header />
                <h2 className="welcome-message">Welcome {this.state.user}</h2>
                <div className="user-buttons">
                        <Link to={`/user/edit`}>
                            <a className="btn-main">Edit your profile</a>
                        </Link>
                </div>
            </React.Fragment>
        )
    }
}

export default UserSettings;
