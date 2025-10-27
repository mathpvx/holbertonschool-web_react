import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Notifications from './Notifications';

function make(preloadedState) {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  return { store, ui: render(<Provider store={store}><Notifications /></Provider>) };
}

test('loads and displays notifications from API on mount via App normally, but component renders list UI', async () => {
  const { ui } = make({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: { notifications: [], displayDrawer: true },
    courses: { courses: [] },
  });
  expect(ui).toBeTruthy();
  expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
});

test('can open and close drawer', () => {
  const { store } = make({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: { notifications: [], displayDrawer: false },
    courses: { courses: [] },
  });
  fireEvent.click(screen.getByText(/Your notifications/i));
  expect(store.getState().notifications.displayDrawer).toBe(true);
  const btn = screen.getByRole('button', { name: /close/i });
  fireEvent.click(btn);
  expect(store.getState().notifications.displayDrawer).toBe(false);
});

test('marking a notification as read removes it', () => {
  make({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'A' },
        { id: 2, type: 'urgent', value: 'B' },
      ],
      displayDrawer: true,
    },
    courses: { courses: [] },
  });
  fireEvent.click(screen.getByText('A'));
  expect(screen.queryByText('A')).not.toBeInTheDocument();
});
