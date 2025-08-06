import React, { Component, Fragment } from 'react';
import './App.css';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Notifications />
        <Header />
        <Login />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
