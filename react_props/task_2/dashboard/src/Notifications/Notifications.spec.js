import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {
  const sampleNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
  ];

  test('renders the notifications title', () => {
    render(<Notifications notifications={sampleNotifications} />);
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  test('renders the close button and logs on click', () => {
    console.log = jest.fn();
    render(<Notifications notifications={sampleNotifications} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(console.log).toHaveBeenCalledWith('Close button has been clicked');
  });

  test('renders 3 notification items', () => {
    render(<Notifications notifications={sampleNotifications} />);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(3);
  });
});
