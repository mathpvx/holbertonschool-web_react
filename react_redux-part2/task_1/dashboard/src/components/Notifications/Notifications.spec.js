import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Notifications from './Notifications';

function setup(preloadedState) {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  const ui = render(
    <Provider store={store}>
      <Notifications />
    </Provider>
  );
  const drawer = ui.container.querySelector('#notifications');
  return { store, ui, drawer };
}

test('drawer hidden by default (no visible class)', () => {
  const { drawer } = setup({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: { notifications: [], loading: false },
    courses: { courses: [] },
  });
  expect(drawer.className).not.toMatch(/visible_/);
});

test('clicking menu item shows drawer (adds visible class)', () => {
  const { drawer } = setup({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: { notifications: [], loading: false },
    courses: { courses: [] },
  });
  fireEvent.click(screen.getByText(/Your notifications/i));
  expect(drawer.className).toMatch(/visible_/);
});

test('shows loading indicator when loading is true', () => {
  setup({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: { notifications: [], loading: true },
    courses: { courses: [] },
  });
  fireEvent.click(screen.getByText(/Your notifications/i));
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('renders notifications list when loading is false', () => {
  setup({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'A' },
        { id: 2, type: 'urgent', value: 'B' },
      ],
      loading: false,
    },
    courses: { courses: [] },
  });
  fireEvent.click(screen.getByText(/Your notifications/i));
  expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.getByText('B')).toBeInTheDocument();
});

test('clicking close hides drawer (removes visible class)', () => {
  const { drawer } = setup({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: { notifications: [], loading: false },
    courses: { courses: [] },
  });
  fireEvent.click(screen.getByText(/Your notifications/i));
  const btn = screen.getByRole('button', { name: /close/i });
  fireEvent.click(btn);
  expect(drawer.className).not.toMatch(/visible_/);
});
