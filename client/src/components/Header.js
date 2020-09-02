import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class Header extends Component {

    constructor() {
        super();
        this.state = {
            user: ''
        };
    }

    async componentDidMount() {
        const res = await fetch(`/session`);
        const data = await res.json();
        if (data.loggedin) {
            this.setState({ user: data.username })
        }
    }

    successfullyLoggedOut = (e) => {
        toast.success('Logged Out');
    }

    logout = (e) => {
        e.preventDefault();
        this.successfullyLoggedOut()
        setTimeout(() => {
            fetch('/logout');
            window.location.reload(true); 
        }, 1000);
        
    }

    render() {
        if (this.state.user) {
            return (
                <React.Fragment>
                    <header className='header'>
                        <p className="header-title">
                            Term paper catalogue
                        </p>
                        <div className="user">
                            <Link to="/user/settings" style={{ color: 'white', textDecoration: 'none' }}>
                                <p className="login-btn">{this.state.user}</p>
                            </Link>
                            &nbsp;|&nbsp;
                            <Link onClick={this.logout} style={{ color: 'white', textDecoration: 'none' }}>
                                <p className="login-btn">Log out</p>
                            </Link>
                        </div>
                        <div className="nav-menu">
                            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                                <p className="nav-link">Home</p>
                            </Link>
                            <Link to="/papers" style={{ color: 'white', textDecoration: 'none' }}>
                                <p className="nav-link">Papers</p>
                            </Link>
                            <Link to="/add" style={{ color: 'white', textDecoration: 'none' }}>
                                <p className="nav-link">Add Paper</p>
                            </Link>
                            <Link to="/search" style={{ color: 'white', textDecoration: 'none' }}>
                                <p className="nav-link">Search</p>
                            </Link>
                            <Link to="/user/settings" style={{ color: 'white', textDecoration: 'none' }}>
                                <p className="nav-link">User Settings</p>
                            </Link>
                        </div>
                    </header>
                        <ToastContainer/>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <header className='header'>
                        <p className="header-title">
                            Term paper catalogue
                            </p>
                        <div className="user">
                            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
                                <p className="login-btn">Log in</p>
                            </Link>
                        </div>
                        <div className="nav-menu">
                            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                                <p className="nav-link">Home</p>
                            </Link>
                            <Link to="/papers" style={{ color: 'white', textDecoration: 'none' }}>
                                <p className="nav-link">Papers</p>
                            </Link>
                            <Link to="/search" style={{ color: 'white', textDecoration: 'none' }}>
                                <p className="nav-link">Search</p>
                            </Link>
                        </div>
                        <ToastContainer/>
                    </header>
                </React.Fragment>
            )
        }
    }
}

export default Header;