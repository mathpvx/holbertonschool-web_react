import Header from './Header';
import { render, screen } from '@testing-library/react';


test('h1 with text "School dashboard"', () => {
	render(<Header/>)
    const heading = screen.getByRole('heading', { level: 1, name: /school dashboard/i });
    expect(heading).toBeInTheDocument();
  });

test('image with text "holberton logo"', () => {
	render(<Header/>)
	const logoImg = screen.getByAltText(/holberton logo/i);
	expect(logoImg).toBeInTheDocument();
});
