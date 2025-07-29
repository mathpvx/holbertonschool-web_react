import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App/App.jsx';

describe('App component', () => {
  test('renders two input fields', () => {
    render(<App />);
    const inputs = screen.getAllByRole('textbox');
    const password = screen.getByLabelText(/password/i);
    expect(inputs.length).toBe(1);
    expect(password).toBeInTheDocument();
  });

  test('renders two labels: Email and Password', () => {
    render(<App />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('renders a button with text OK', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
  });
});
