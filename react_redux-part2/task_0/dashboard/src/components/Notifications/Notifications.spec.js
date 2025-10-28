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

test('drawer is hidden by default (no visible class)', () => {
  const { drawer } = setup({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: { notifications: [] },
    courses: { courses: [] },
  });
  expect(drawer.className).not.toMatch(/visible_/);
});

test('clicking menu item shows drawer by adding visible class', () => {
  const { drawer } = setup({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: { notifications: [] },
    courses: { courses: [] },
  });
  fireEvent.click(screen.getByText(/Your notifications/i));
  expect(drawer.className).toMatch(/visible_/);
});

test('clicking close hides drawer by removing visible class', () => {
  const { drawer } = setup({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: { notifications: [] },
    courses: { courses: [] },
  });
  fireEvent.click(screen.getByText(/Your notifications/i));
  expect(drawer.className).toMatch(/visible_/);
  const btn = screen.getByRole('button', { name: /close/i });
  fireEvent.click(btn);
  expect(drawer.className).not.toMatch(/visible_/);
});

test('marking a notification as read removes it from the list', () => {
  setup({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'A' },
        { id: 2, type: 'urgent', value: 'B' },
      ],
    },
    courses: { courses: [] },
  });
  fireEvent.click(screen.getByText(/Your notifications/i));
  const item = screen.getByText('A');
  fireEvent.click(item);
  expect(screen.queryByText('A')).not.toBeInTheDocument();
});
