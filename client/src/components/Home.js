import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { Header } from './Header';

export class Home extends Component {
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
        return (
            <div>  
            <Header />
                <h1>Welcome {this.state.user}</h1>  
            </div>
        )
    }
}

export default Home;