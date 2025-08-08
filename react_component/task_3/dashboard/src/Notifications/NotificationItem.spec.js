import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

test('markAsRead prop is called when clicked', () => {
  const mockMarkAsRead = jest.fn();
  const { getByText } = render(
    <NotificationItem
      type="default"
      value="Test notification"
      markAsRead={mockMarkAsRead}
    />
  );

  fireEvent.click(getByText('Test notification'));
  expect(mockMarkAsRead).toHaveBeenCalledTimes(1);
});
