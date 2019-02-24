import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Dog from './Dog';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dog logo={logo} />
      </div>
    );
  }
}

export default (App);
