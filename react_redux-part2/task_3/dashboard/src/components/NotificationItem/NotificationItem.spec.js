import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

test('renders default type in blue', () => {
  render(<ul><NotificationItem id={1} type="default" value="Hello" /></ul>);
  const li = screen.getByText('Hello');
  expect(li).toHaveAttribute('data-notification-type', 'default');
  expect(li).toHaveStyle({ color: 'rgb(0, 0, 255)' });
});

test('renders urgent type in red', () => {
  render(<ul><NotificationItem id={2} type="urgent" value="Alert" /></ul>);
  const li = screen.getByText('Alert');
  expect(li).toHaveAttribute('data-notification-type', 'urgent');
  expect(li).toHaveStyle({ color: 'rgb(255, 0, 0)' });
});

test('calls markAsRead with id on click', () => {
  const fn = jest.fn();
  render(<ul><NotificationItem id={7} type="default" value="Click me" markAsRead={fn} /></ul>);
  fireEvent.click(screen.getByText('Click me'));
  expect(fn).toHaveBeenCalledWith(7);
});
