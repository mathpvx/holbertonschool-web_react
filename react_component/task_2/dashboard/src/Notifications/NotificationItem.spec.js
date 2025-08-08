import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem component', () => {
  it('calls markAsRead with the correct id when clicked', () => {
    const mockMarkAsRead = jest.fn();
    const { getByText } = render(
      <NotificationItem
        id={42}
        type="default"
        value="Test notification"
        markAsRead={mockMarkAsRead}
      />
    );

    fireEvent.click(getByText('Test notification'));
    expect(mockMarkAsRead).toHaveBeenCalledTimes(1);
    expect(mockMarkAsRead).toHaveBeenCalledWith(42);
  });

  it('renders with default type and blue color', () => {
    const { container } = render(
      <NotificationItem type="default" value="Test notification" markAsRead={() => {}} />
    );

    const li = container.querySelector('li');
    expect(li).toHaveAttribute('data-notification-type', 'default');
  });

  it('renders with urgent type and red color', () => {
    const { container } = render(
      <NotificationItem type="urgent" value="Urgent notification" markAsRead={() => {}} />
    );

    const li = container.querySelector('li');
    expect(li).toHaveAttribute('data-notification-type', 'urgent');
  });

  it('renders HTML content correctly', () => {
    const htmlContent = "<strong>Urgent requirement</strong> - complete by EOD";
    const { container } = render(
      <NotificationItem
        type="urgent"
        html={{ __html: htmlContent }}
        markAsRead={() => {}}
      />
    );

    const li = container.querySelector('li');
    expect(li.innerHTML).toBe(htmlContent);
  });
});
