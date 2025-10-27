import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Login from './Login';

function makeStore() {
  return configureStore({
    reducer: rootReducer,
    preloadedState: {
      auth: { isLoggedIn: false, user: { email: '', password: '' } },
      notifications: { notifications: [], displayDrawer: true },
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

test('enables submit on valid email and password then logs in', () => {
  const store = makeStore();
  render(<Provider store={store}><Login /></Provider>);
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'a@b.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '123456' } });
  const btn = screen.getByRole('button', { name: /OK/i });
  expect(btn).toBeEnabled();
  fireEvent.click(btn);
  expect(store.getState().auth.isLoggedIn).toBe(true);
});
