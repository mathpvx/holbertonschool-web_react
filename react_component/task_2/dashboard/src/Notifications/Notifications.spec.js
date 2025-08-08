import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';
import { getLatestNotification } from '../utils/utils';

describe('Notifications component', () => {
  const mockNotifications = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
  ];

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  it('renders 3 notification items', () => {
    const { container } = render(<Notifications notifications={mockNotifications} />);
    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(3);
  });

  it('calls console.log with correct message when a notification is clicked', () => {
    const { getByText } = render(<Notifications notifications={mockNotifications} />);
    fireEvent.click(getByText('New course available'));
    expect(console.log).toHaveBeenCalledWith('Notification 1 has been marked as read');
  });

  it('renders empty list when no notifications are passed', () => {
    const { container } = render(<Notifications />);
    const items = container.querySelectorAll('li');
    expect(items).toHaveLength(0);
  });
});
