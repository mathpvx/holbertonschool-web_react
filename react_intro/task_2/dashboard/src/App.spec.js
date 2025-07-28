import { render, screen } from '@testing-library/react';
import App from './App.jsx';

describe('App component', () => {
  test('renders the h1 with text "School dashboard"', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /school dashboard/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders the expected text in App-body and App-footer', () => {
    render(<App />);

    const bodyText = screen.getByText(/login to access the full dashboard/i);
    expect(bodyText).toBeInTheDocument();

    const currentYear = new Date().getFullYear();
    const footerText = screen.getByText(
      new RegExp(`Copyright ${currentYear} - holberton School`, 'i')
    );
    expect(footerText).toBeInTheDocument();
  });

  test('renders the image with alt text "holberton logo"', () => {
    render(<App />);
    const logoImg = screen.getByAltText(/holberton logo/i);
    expect(logoImg).toBeInTheDocument();
  });
});
