import App from './App.jsx';
import { render, screen } from '@testing-library/react';

test('Renders Course list title when isLoggedIn is true', () => {
  render(<App isLoggedIn={true} />);
  const title = screen.getByText(/course list/i);
  expect(title).toBeInTheDocument();
});

test('Renders Log in to continue title when isLoggedIn is false', () => {
  render(<App isLoggedIn={false} />);
  const title = screen.getByText(/log in to continue/i);
  expect(title).toBeInTheDocument();
});

test('Renders News from the School section with paragraph', () => {
  render(<App />);
  const title = screen.getByText(/news from the school/i);
  const paragraph = screen.getByText(/holberton school news goes here/i);
  expect(title).toBeInTheDocument();
  expect(paragraph).toBeInTheDocument();
});
