import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../app/rootReducer';
import App from '../App';

function renderWithStore(preloadedState) {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

describe('App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('shows Login when isLoggedIn is false', () => {
    renderWithStore({
      auth: { isLoggedIn: false, user: { email: '', password: '' } },
      notifications: { notifications: [], displayDrawer: true },
      courses: { courses: [] },
    });
    expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
  });

  it('shows CourseList when isLoggedIn is true', () => {
    renderWithStore({
      auth: { isLoggedIn: true, user: { email: 'a@b.com', password: '123' } },
      notifications: { notifications: [], displayDrawer: true },
      courses: { courses: [] },
    });
    expect(screen.getByText(/Available courses/i)).toBeInTheDocument();
  });

  it('loads notifications on mount', async () => {
    const sample = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'Server is down' },
    ];
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(sample),
    });
    renderWithStore({
      auth: { isLoggedIn: false, user: { email: '', password: '' } },
      notifications: { notifications: [], displayDrawer: true },
      courses: { courses: [] },
    });
    await waitFor(() =>
      expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument()
    );
  });
});
