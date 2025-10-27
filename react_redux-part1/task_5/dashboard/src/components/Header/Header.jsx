import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import holbertonLogo from '../../assets/holberton-logo.jpg';

function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <div className={css(styles.header)}>
      <img src={holbertonLogo} className={css(styles.logo)} alt="Holberton School logo" />
      <h1 className={css(styles.title)}>School dashboard</h1>

      {isLoggedIn && (
        <div id="logoutSection" className={css(styles.logout)}>
          Welcome <strong>{user?.email}</strong> (
          <a href="#" onClick={handleLogout} className={css(styles.link)}>
            logout
          </a>
          )
        </div>
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    borderBottom: '3px solid #e01d3f',
    paddingBottom: '1rem',
  },
  logo: {
    height: '200px',
  },
  title: {
    color: '#e01d3f',
  },
  logout: {
    marginLeft: 'auto',
    fontSize: '14px',
  },
  link: {
    color: '#e01d3f',
    textDecoration: 'none',
    ':hover': { textDecoration: 'underline' },
  },
});

export default Header;
