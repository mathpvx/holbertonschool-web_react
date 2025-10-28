import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { useSelector } from 'react-redux';

function Footer() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const year = new Date().getFullYear();

  return (
    <footer className={css(styles.footer)}>
      <p>
        Copyright {year} - Holberton School
        {isLoggedIn && (
          <>
            {' '}
            - <a href="#">Contact us</a>
          </>
        )}
      </p>
    </footer>
  );
}

const styles = StyleSheet.create({
  footer: {
    textAlign: 'center',
    fontStyle: 'italic',
    borderTop: '3px solid #e01d3f',
    padding: '1rem 0',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
});

export default Footer;
