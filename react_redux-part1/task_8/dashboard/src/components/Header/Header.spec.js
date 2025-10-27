import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Header from './Header';
import { login } from '../../features/auth/authSlice';

function makeStore(preloadedState) {
  return configureStore({ reducer: rootReducer, preloadedState });
}

test('shows logout link and welcome when logged in, and logs out on click', () => {
  const store = makeStore({
    auth: { isLoggedIn: true, user: { email: 'john@doe.com', password: 'x' } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
  expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  const logout = screen.getByText(/logout/i);
  fireEvent.click(logout);
  expect(store.getState().auth.isLoggedIn).toBe(false);
});

test('shows welcome after login action dispatched', () => {
  const store = makeStore({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
  store.dispatch(login({ email: 'a@b.com', password: '123' }));
  expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
});
