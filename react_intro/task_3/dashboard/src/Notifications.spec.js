import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  test('renders the notifications title', () => {
    render(<Notifications />);
    expect(
      screen.getByText(/here is the list of notifications/i)
    ).toBeInTheDocument();
  });

  test('renders a close button', () => {
    render(<Notifications />);
    expect(
      screen.getByRole('button', { name: /close/i })
    ).toBeInTheDocument();
  });

  test('renders three list items', () => {
    render(<Notifications />);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(3);
  });

  test('logs "Close button has been clicked" when the button is clicked', () => {
    console.log = jest.fn();
    render(<Notifications />);
    const button = screen.getByRole('button', { name: /close/i });
    fireEvent.click(button);
    expect(console.log).toHaveBeenCalledWith('Close button has been clicked');
  });
});
