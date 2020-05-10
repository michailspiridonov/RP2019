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

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/papers" exact component={Papers} />
          <Route path="/paper/:id" exact component={Paper} />
          <Route path="/add" exact component={Add}/>
          <Route path="/delete/:id" exact component={Delete}/>
          <Route path="/download/:id/:title" exact component={Download}/>
          <Route path="/search" exact component={Search}/>
          <Route path="/search/results" exact component={Results}/>
        </div>
      </Router>
    )
  }
}

export default App;
