import React, { Component } from 'react';
import { Link } from 'react-router-dom'; ''

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
        if(data.loggedin){
            this.setState({ user: data.username})
        }
      }

    render() {
        if(this.state.user){
            return (
                <React.Fragment>
                    <header className='header'>
                        <p>
                            Term paper catalogue
                            </p>
                        <div className="nav-menu">
                            <Link to="/" style={{color: 'white', textDecoration: 'none'}}>
                                <p className="nav-link">Home</p>
                            </Link>
                            <Link to="/papers" style={{color: 'white', textDecoration: 'none'}}>
                                <p className="nav-link">Papers</p>
                            </Link>
                            <Link to="/add" style={{color: 'white', textDecoration: 'none'}}>
                                <p className="nav-link">Add Paper</p>
                            </Link>
                            <Link to="/search" style={{color: 'white', textDecoration: 'none'}}>
                                <p className="nav-link">Search</p>
                            </Link>
                            <Link to="/usersettings" style={{color: 'white', textDecoration: 'none'}}>
                                <p className="nav-link">User Settings</p>
                            </Link>
                            <Link to="/logout" style={{color: 'white', textDecoration: 'none'}}>
                                <p className="nav-link">Logout</p>
                            </Link>
                        </div>
                    </header>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <header className='header'>
                        <p>
                            Term paper catalogue
                            </p>
                        <div className="nav-menu">
                            <Link to="/" style={{color: 'white', textDecoration: 'none'}}>
                                <p className="nav-link">Home</p>
                            </Link>
                            <Link to="/papers" style={{color: 'white', textDecoration: 'none'}}>
                                <p className="nav-link">Papers</p>
                            </Link>
                            <Link to="/search" style={{color: 'white', textDecoration: 'none'}}>
                                <p className="nav-link">Search</p>
                            </Link>
                            <Link to="/login" style={{color: 'white', textDecoration: 'none'}}>
                                <p className="nav-link">Login</p>
                            </Link>
                        </div>
                    </header>
                </React.Fragment>
            )
        }
    }
}

export default Header;