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
                    <Link to="/" style={linkStyle}>
                        <p className="nav-link">Home</p>
                    </Link>
                    <Link to="/papers" style={linkStyle}>
                        <p className="nav-link">Papers</p>
                    </Link>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Header;