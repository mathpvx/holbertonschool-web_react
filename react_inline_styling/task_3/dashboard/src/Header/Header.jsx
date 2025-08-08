import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
    const styles = StyleSheet.create({
        AppHeader: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderBottom: '0.25rem solid #e1003c',
            // flexWrap: 'wrap', 
            padding: '0.5rem 1rem'
        },
        AppHeaderH1: {
            fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            fontWeight: 600,
            letterSpacing: '0.025rem',
            color: '#e1003c',
            marginLeft: '1rem',
            '@media (max-width: 900px)': {
                fontSize: '1.8rem',
                flex: '1 1 auto',
                wordBreak: 'break-word',
                marginLeft: '0.5rem'
            }
        },
        AppLogo: {
            height: '15rem',
            '@media (max-width: 900px)': {
                height: '10rem'
            }
        }
    });

    return (
        <header className={css(styles.AppHeader)}>
            <img className={css(styles.AppLogo)} src={holbertonLogo} alt='holberton logo' />
            <h1 className={css(styles.AppHeaderH1)}>School dashboard</h1>
        </header>
    );
}

export default Header;
