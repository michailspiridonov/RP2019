import React, { Component } from 'react';
import './App.css';
import Papers from './components/papers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home';
import Header from './components/header';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route path="/" exact component={Home} />
          <Route path="/papers" component={Papers} />
        </div>
      </Router>
    )
  }
}

export default App;
