import React from 'react';
import { render, screen } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem', () => {
  test('renders a default notification with blue text', () => {
    render(<NotificationItem type="default" value="Test notification" />);
    const item = screen.getByText('Test notification');
    expect(item).toHaveAttribute('data-notification-type', 'default');
    expect(item).toHaveStyle('color: blue');
  });

  test('renders an urgent notification with red text', () => {
    render(<NotificationItem type="urgent" value="Urgent message" />);
    const item = screen.getByText('Urgent message');
    expect(item).toHaveAttribute('data-notification-type', 'urgent');
    expect(item).toHaveStyle('color: red');
  });

  test('renders html content when html prop is provided', () => {
    const html = { __html: '<strong>Test HTML</strong>' };
    render(<NotificationItem type="urgent" html={html} />);
    const item = screen.getByText('Test HTML');
    expect(item).toBeInTheDocument();
    expect(item).toHaveAttribute('data-notification-type', 'urgent');
  });
});
