import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Footer from './Footer';

function renderWith(preloadedState) {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  return render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );
}

test('shows copyright text', () => {
  renderWith({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });
  const year = new Date().getFullYear();
  expect(screen.getByText(new RegExp(`Copyright ${year} - Holberton School`))).toBeInTheDocument();
});

test('shows Contact us link when logged in', () => {
  renderWith({
    auth: { isLoggedIn: true, user: { email: 'a@b.com', password: 'x' } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });
  expect(screen.getByText(/Contact us/i)).toBeInTheDocument();
});

test('hides Contact us link when logged out', () => {
  renderWith({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });
  expect(screen.queryByText(/Contact us/i)).not.toBeInTheDocument();
});
