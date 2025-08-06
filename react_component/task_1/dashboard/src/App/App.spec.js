import App from './App.jsx';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

test('Renders Notifications component', () => {
  render(<App />);
  const notification = screen.getByText(/notifications/i);
  expect(notification).toBeInTheDocument();
});

test('Renders Header component', () => {
  render(<App />);
  const header = screen.getByText(/school dashboard/i);
  expect(header).toBeInTheDocument();
});

test('Renders Login component', () => {
  render(<App />);
  const loginText = screen.getByText(/login to access the full dashboard/i);
  expect(loginText).toBeInTheDocument();
});

test('Renders Footer component', () => {
  render(<App />);
  const footer = screen.getByText(/copyright/i);
  expect(footer).toBeInTheDocument();
});

describe('App keyboard shortcut behavior', () => {
  let originalAlert;

  beforeEach(() => {
    originalAlert = window.alert;
    window.alert = jest.fn();
  });

  afterEach(() => {
    window.alert = originalAlert;
  });

  test('Calls logOut and shows alert on Ctrl + h', () => {
    const mockLogOut = jest.fn();
    render(<App logOut={mockLogOut} />);

    const keyboardEvent = new KeyboardEvent('keydown', {
      key: 'h',
      ctrlKey: true,
    });
    document.dispatchEvent(keyboardEvent);

    expect(window.alert).toHaveBeenCalledWith('Logging you out');
    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });
});
