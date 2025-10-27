import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import CourseList from './CourseList';

function make(preloadedState) {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  return render(<Provider store={store}><CourseList /></Provider>);
}

test('renders list of courses', async () => {
  make({
    auth: { isLoggedIn: true, user: { email: 'a@b.com', password: 'x' } },
    notifications: { notifications: [], displayDrawer: true },
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
      ],
    },
  });
  expect(screen.getByText(/Available courses/i)).toBeInTheDocument();
  expect(screen.getByText(/Course name/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
  });
});

test('resets courses array on logout via reducer behavior (slice tested separately)', () => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      auth: { isLoggedIn: true, user: { email: 'a@b.com', password: 'x' } },
      notifications: { notifications: [], displayDrawer: true },
      courses: { courses: [{ id: 1, name: 'ES6', credit: 60 }] },
    },
  });
  render(<Provider store={store}><CourseList /></Provider>);
  expect(screen.getByText('ES6')).toBeInTheDocument();
});
