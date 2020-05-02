import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'

export class Home extends Component {
    render() {
        return (
            <div>
                <h1>This is the home page</h1>
                <Link to="/add">
                    <h3>Add paper</h3>
                </Link>
                <Link to="/search">
                    <h3>Search</h3>
                </Link>
            </div>
        )
    }
}

export default Home
