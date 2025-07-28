import React from 'react';
import logo from './assets/holberton-logo.jpg';
import './App.css';

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="App-header">
        <img src={logo} alt="holberton logo" className="App-logo" />
        <h1>School dashboard</h1>
      </div>

      <div className="App-divider" />

      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>

      <div className="App-footer">
        <div className="App-divider" />
        <p>Copyright {currentYear} - holberton School</p>
      </div>
    </>
  );
}

export default App;
