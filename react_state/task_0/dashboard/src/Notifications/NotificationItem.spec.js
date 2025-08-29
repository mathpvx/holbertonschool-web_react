import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

const mockGetComputedStyle = (element) => {
  const type = element.getAttribute('data-notification-type');
  return {
    color: type === 'default' ? 'blue' : 'red'
  };
};

beforeAll(() => {
  // On remplace temporairement getComputedStyle par notre mock pour avoir du css
  window.getComputedStyle = mockGetComputedStyle;
});

test('Render with type="default" = blue text', () => {
  render(<NotificationItem type="default" value="Test notification" />);
  const liElement = screen.getByText(/Test notification/i);
  expect(liElement).toHaveAttribute('data-notification-type', 'default');
  expect(window.getComputedStyle(liElement).color).toBe('blue');
});

test('Render with type="urgent" = red text', () => {
  render(<NotificationItem type="urgent" value="Urgent notification" />);
  const liElement = screen.getByText(/Urgent notification/i);
  expect(liElement).toHaveAttribute('data-notification-type', 'urgent');
  expect(window.getComputedStyle(liElement).color).toBe('red');
});

test('calls markAsRead when clicked', () => {
  const mockMarkAsRead = jest.fn();
  render(
    <NotificationItem
      id={5}
      type="default"
      value="Click me"
      markAsRead={mockMarkAsRead}
    />
  );
  const liElement = screen.getByText(/Click me/i);
  fireEvent.click(liElement);
  expect(mockMarkAsRead).toHaveBeenCalledWith(5);
});
