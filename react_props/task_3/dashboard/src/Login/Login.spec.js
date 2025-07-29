import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  test('renders 2 labels, 2 inputs and 1 button', () => {
    render(<Login />);
    expect(screen.getAllByLabelText(/email|password/i)).toHaveLength(2);
    expect(screen.getAllByRole('textbox')).toHaveLength(1); // Email input
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument(); // Password input
    expect(screen.getByRole('button')).toHaveTextContent(/ok/i);
  });

  test('focuses input when label is clicked', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.click(screen.getByText(/email/i));
    expect(emailInput).toHaveFocus();
  });
});
