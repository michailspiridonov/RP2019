import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Papers from './components/Papers/Papers';
import Paper from './components/Papers/Paper';
import Home from './components/Home';
import Add from "./components/Papers/Add";
import Delete from "./components/Papers/Delete";
import Download from './components/Papers/Download';
import Search from './components/Search';
import Results from './components/Papers/Results';
import Login from './components/UserManagement/Login';
import UserSettings from './components/UserManagement/UserSettings';
import AddUser from './components/UserManagement/AddUser';
import RemoveUser from './components/UserManagement/RemoveUser';
import EditUser from './components/UserManagement/EditUser';

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
          <Route path="/user/settings" exact component={UserSettings}/>
          <Route path="/user/add" exact component={AddUser}/>
          <Route path="/user/remove" exact component={RemoveUser}/>
          <Route path="/user/edit" exact component={EditUser}/>
        </div>
      </Router>
    )
  }
}

export default App;
