import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';

class App extends Component {
  static defaultProps = {
    logOut: () => {}
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === 'h') {
      alert('Logging you out');
      this.props.logOut();
    }
  };

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

App.propTypes = {
  logOut: PropTypes.func
};

export default App;
