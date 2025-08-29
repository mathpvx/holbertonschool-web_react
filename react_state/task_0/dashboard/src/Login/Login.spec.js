import Login from './Login';
import { render, screen } from '@testing-library/react';

test('contains 2 inputs', () => {
	render(<Login/>)
	const emailInput = screen.getByLabelText(/email/i);
	const passwordInput = screen.getByLabelText(/password/i);
	expect(emailInput).toBeInTheDocument();
	expect(passwordInput).toBeInTheDocument();
});

test('contains 2 labels with text "Email" and "Holberton"', () => {
	render(<Login/>)
	const emailLabel = screen.getByText(/email/i);
	const passwordLabel = screen.getByText(/password/i);
	expect(emailLabel.tagName).toBe('LABEL');
	expect(passwordLabel.tagName).toBe('LABEL');
});

test('contains 1 button with text "OK"', () => {
	render(<Login/>)
	const button = screen.getByRole('button', { name: /ok/i });
	expect(button).toBeInTheDocument();
});
