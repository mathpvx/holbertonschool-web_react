// task_5/dashboard/src/Notifications/Notifications.spec.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Notifications from './Notifications';

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } }
];

describe('Notifications component', () => {
  test('always displays "Your notifications" text', () => {
    render(<Notifications />);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test('does not render notifications when displayDrawer is false', () => {
    render(<Notifications displayDrawer={false} />);
    expect(screen.queryByText(/here is the list/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('renders correct items when displayDrawer is true', () => {
    render(<Notifications displayDrawer={true} notifications={mockNotifications} />);
    expect(screen.getByText(/here is the list/i)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('renders fallback text if notifications array is empty', () => {
    render(<Notifications displayDrawer={true} notifications={[]} />);
    expect(screen.getByText(/no new notification for now/i)).toBeInTheDocument();
  });
});
