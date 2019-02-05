import React, { Component } from 'react';
import routes from './routes';
import Header from './Components/Header/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {routes}
      </div>
    );
  }
}

export default App;
