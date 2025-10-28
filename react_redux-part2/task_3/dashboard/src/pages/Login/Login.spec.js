import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Login from './Login';

// Mock the useLogin hook to provide functional handlers in tests
jest.mock('../../hooks/useLogin', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: (opts) => {
      const [email, setEmail] = React.useState('');
      const [password, setPassword] = React.useState('');
      const isValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 6;

      return {
        email,
        password,
        isValid,
        handleEmailChange: (e) => setEmail(e.target.value),
        handlePasswordChange: (e) => setPassword(e.target.value),
        handleSubmit: (e) => {
          e.preventDefault();
          if (isValid && opts && typeof opts.onLogin === 'function') {
            opts.onLogin({ email, password });
          }
        },
      };
    },
  };
});

function makeStore() {
  return configureStore({
    reducer: rootReducer,
    preloadedState: {
      auth: { isLoggedIn: false, user: { email: '', password: '' } },
      notifications: { notifications: [] },
      courses: { courses: [] },
    },
  });
}

test('renders email, password, and submit button', () => {
  const store = makeStore();
  render(<Provider store={store}><Login /></Provider>);
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /OK/i })).toBeDisabled();
});

test('enables submit on valid email and password then logs in', async () => {
  const store = makeStore();
  render(<Provider store={store}><Login /></Provider>);

  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/Email/i), 'a@b.com');
  await user.type(screen.getByLabelText(/Password/i), '123456');

  const btn = screen.getByRole('button', { name: /OK/i });
  expect(btn).toBeEnabled();

  await user.click(btn);
  expect(store.getState().auth.isLoggedIn).toBe(true);
});
