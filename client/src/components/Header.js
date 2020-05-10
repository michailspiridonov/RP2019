import React from 'react'
import { Link } from 'react-router-dom'

export function Header() {
    const linkStyle = {
        color: 'white',
        textDecoration: 'none'
    };
    return (
        <React.Fragment>
            <header className='header'>
                <p>
                    Term paper catalogue
                    </p>
                <div className="nav-menu">
                    <Link to="/papers" style={linkStyle}>
                        <p className="nav-link">Papers</p>
                    </Link>
                    <Link to="/add" style={linkStyle}>
                        <p className="nav-link">Add Paper</p>
                    </Link>
                    <Link to="/search" style={linkStyle}>
                        <p className="nav-link">Search</p>
                    </Link>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header;