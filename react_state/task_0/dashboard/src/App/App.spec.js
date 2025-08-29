import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('h1 with text "School dashboard"', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { level: 1, name: /school dashboard/i });
    expect(heading).toBeInTheDocument();
  });

  test('body and footer paragraphs', () => {
    render(<App />);
    const bodyText = screen.getByText(/login to access the full dashboard/i);
    expect(bodyText).toBeInTheDocument();

    const footerText = screen.getByText(/copyright.*holberton school/i);
    expect(footerText).toBeInTheDocument();
  });

  test('image with text "holberton logo"', () => {
    render(<App />);
    const logoImg = screen.getByAltText(/holberton logo/i);
    expect(logoImg).toBeInTheDocument();
  });

  test('contains 2 inputs', () => {
    render(<App />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('contains 2 labels with text "Email" and "Holberton"', () => {
    render(<App />);
    const emailLabel = screen.getByText(/email/i);
    const passwordLabel = screen.getByText(/password/i);
    expect(emailLabel.tagName).toBe('LABEL');
    expect(passwordLabel.tagName).toBe('LABEL');
  });

  test('contains 1 button with text "OK"', () => {
    render(<App />);
    const button = screen.getByRole('button', { name: /ok/i });
    expect(button).toBeInTheDocument();
  });

  test('renders Login when isLoggedIn=false', () => {
    render(<App isLoggedIn={false} />);
    expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
  });

  test('renders CourseList when isLoggedIn=true', () => {
    render(<App isLoggedIn={true} />);
    expect(screen.getByText(/ES6/i)).toBeInTheDocument();
    expect(screen.getByText(/Webpack/i)).toBeInTheDocument();
    expect(screen.getByText(/React/i)).toBeInTheDocument();
  });

  test('calls logOut when Ctrl+H is pressed', () => {
    const mockLogOut = jest.fn();
    render(<App logOut={mockLogOut} />);
    const event = new KeyboardEvent('keydown', { key: 'h', ctrlKey: true });
    document.dispatchEvent(event);
    expect(mockLogOut).toHaveBeenCalledTimes(1);
  });

  test('calls alert with "Logging you out" when Ctrl+H is pressed', () => {
    const mockLogOut = jest.fn();
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<App logOut={mockLogOut} />);
    const event = new KeyboardEvent('keydown', { key: 'h', ctrlKey: true });
    document.dispatchEvent(event);
    expect(mockAlert).toHaveBeenCalledWith('Logging you out');
    mockAlert.mockRestore();
  });

  test('displays "Course list" title when isLoggedIn is true', () => {
  render(<App isLoggedIn={true} />);
  expect(screen.getByText(/course list/i)).toBeInTheDocument();
  });

  test('displays "Log in to continue" title when isLoggedIn is false', () => {
    render(<App isLoggedIn={false} />);
    expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
  });

  test('displays news section by default', () => {
    render(<App />);
    expect(screen.getByText(/news from the school/i)).toBeInTheDocument();
    expect(screen.getByText(/holberton school news goes here/i)).toBeInTheDocument();
  });

});
