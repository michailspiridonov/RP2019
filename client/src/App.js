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

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/papers" component={Papers} />
          <Route path="/paper/:id" component={Paper} />
          <Route path="/add" component={Add}/>
          <Route path="/delete/:id" component={Delete}/>
          <Route path="/download/:id/:title" component={Download}/>
          <Route path="/search" component={Search}/>
        </div>
      </Router>
    )
  }
}

export default App;
