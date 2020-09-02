import React, { Component } from 'react';
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
            </div>
        )
    }
}

export default Home;