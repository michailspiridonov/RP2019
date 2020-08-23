import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';

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
        if(!this.state.user){
            return(
                <div>
                    <Header/>
                <h1>Please login to view this page</h1>
                </div>
            )
        }
        return (
            <React.Fragment>
                <Header />
                <div className="user-buttons">
                    <button>
                        <Link to={`/adduser`}>
                            <h3>Add User</h3>
                        </Link>
                    </button>
                    <button>
                        <Link to={`/`}>
                            <h3 >Remove User</h3>
                        </Link>
                    </button>
                    <button>
                        <Link to={`/`}>
                            <h3 >Edit {this.state.user}</h3>
                        </Link>
                    </button>
                </div>
            </React.Fragment>
        )
    }
}

export default UserSettings;
