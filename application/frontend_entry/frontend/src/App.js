import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Let's get started creating the DAMS frontend here. <br />
          </p>
          <a
            className="App-link"
            href="http://localhost:8000"
            target="_blank"
            rel="noopener noreferrer"
          >
            Backend APIs are at port 8000
          </a>
        </header>
      </div>
    );
  }
}

export default App;
