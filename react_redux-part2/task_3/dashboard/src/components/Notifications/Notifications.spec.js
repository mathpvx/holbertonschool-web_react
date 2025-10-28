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

test('filters between all, default and urgent', () => {
  setup({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: {
      loading: false,
      notifications: [
        { id: 1, type: 'default', isRead: false, value: 'A' },
        { id: 2, type: 'urgent', isRead: false, value: 'B' },
        { id: 3, type: 'default', isRead: false, value: 'C' },
      ],
    },
    courses: { courses: [] },
  });

  fireEvent.click(screen.getByText(/Your notifications/i));
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.getByText('B')).toBeInTheDocument();
  expect(screen.getByText('C')).toBeInTheDocument();

  fireEvent.click(screen.getByLabelText('filter-urgent'));
  expect(screen.queryByText('A')).not.toBeInTheDocument();
  expect(screen.getByText('B')).toBeInTheDocument();
  expect(screen.queryByText('C')).not.toBeInTheDocument();

  fireEvent.click(screen.getByLabelText('filter-default'));
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.queryByText('B')).not.toBeInTheDocument();
  expect(screen.getByText('C')).toBeInTheDocument();

  fireEvent.click(screen.getByLabelText('filter-all'));
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.getByText('B')).toBeInTheDocument();
  expect(screen.getByText('C')).toBeInTheDocument();
});

test('mark as read removes item from the list', () => {
  setup({
    auth: { isLoggedIn: false, user: { email: '', password: '' } },
    notifications: {
      loading: false,
      notifications: [
        { id: 10, type: 'default', isRead: false, value: 'Read me' },
      ],
    },
    courses: { courses: [] },
  });

  fireEvent.click(screen.getByText(/Your notifications/i));
  const item = screen.getByText('Read me');
  fireEvent.click(item);
  expect(screen.queryByText('Read me')).not.toBeInTheDocument();
});
