import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import useLogin from '../../hooks/useLogin';

function Login() {
  const dispatch = useDispatch();

  const {
    email,
    password,
    isValid,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLogin({
    onLogin: ({ email, password }) => dispatch(login({ email, password })),
  });

  return (
    <div className={css(styles.login)}>
      <p>Login to access the full dashboard</p>
      <form onSubmit={handleSubmit} className={css(styles.form)}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          className={css(styles.input)}
          value={email}
          onChange={handleEmailChange}
        />

        <label htmlFor="password" className={css(styles.label)}>
          Password:
        </label>
        <input
          id="password"
          type="password"
          className={css(styles.input)}
          value={password}
          onChange={handlePasswordChange}
        />

        <button type="submit" disabled={!isValid} className={css(styles.button)}>
          OK
        </button>
      </form>
    </div>
  );
}

const styles = StyleSheet.create({
  login: {
    padding: '2rem',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  input: {
    marginRight: '1rem',
  },
  label: {
    marginLeft: '0.5rem',
  },
  button: {
    padding: '0.4rem 0.75rem',
  },
});

export default Login;
