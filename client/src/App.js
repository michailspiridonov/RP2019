import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Papers from './components/Papers';
import Paper from './components/Paper';
import Home from './components/Home';
import Header from './components/Header';
import Add from "./components/Add";
import Delete from "./components/Delete";
import Download from './components/Download';
import Search from './components/Search';
import Results from './components/Results';
import Login from './components/Login';
import Logout from './components/Logout';
import UserSettings from './components/UserSettings';
import AddUser from './components/AddUser';
import RemoveUser from './components/RemoveUser';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact component={Home} />
          <Route path="/papers" exact component={Papers} />
          <Route path="/paper/:id" exact component={Paper} />
          <Route path="/add" exact component={Add}/>
          <Route path="/delete/:id" exact component={Delete}/>
          <Route path="/download/:id/:title" exact component={Download}/>
          <Route path="/search" exact component={Search}/>
          <Route path="/search/results" exact component={Results}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/logout" exact component={Logout}/>
          <Route path="/usersettings" exact component={UserSettings}/>
          <Route path="/adduser" exact component={AddUser}/>
          <Route path="/removeuser" exact component={RemoveUser}/>
        </div>
      </Router>
    )
  }
}

export default App;
