import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from '../GUI/Header';
import axios from 'axios';

export class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: '',
            message: '',
            loading: true,
            oldPassword: '',
            newPassword: '',
            confirmationPassword: '',
            newUsername: '',
            userCanChangeName: false
        }
    }
    async componentDidMount(){
        const sres = await fetch(`/session`);
        const sdata = await sres.json();
        if (sdata.loggedin) {
            this.setState({ user: sdata.username })
        } else {
            this.setState({
                loading: false,
                redirect: '/'
            })
        }
    }

    render() {
        if(this.state.loading){
            
        }
    }
}