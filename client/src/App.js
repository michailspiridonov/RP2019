import React, { Component } from 'react';
import './App.css';
import Papers from './components/papers';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Term papers catalogue</h1>
        </header>
        <Papers />
      </div>
    )
  }
}

export default App;
