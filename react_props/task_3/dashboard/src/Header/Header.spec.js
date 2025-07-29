import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  test('renders the Holberton logo', () => {
    render(<Header />);
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });

  test('renders the h1 heading', () => {
    render(<Header />);
    const heading = screen.getByText(/school dashboard/i);
    expect(heading).toBeInTheDocument();
  });
});
