import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

class MockApp extends React.Component {
  render () {
    return (
      <h1>Hello from Mock App Component</h1>
    );
  }
}

describe('WithLogging HOC', () => {
  test('renders heading from wrapped component', () => {
    const WrappedMockApp = WithLogging(MockApp);
    render(<WrappedMockApp />);
    expect(screen.getByText(/hello from mock app component/i)).toBeInTheDocument();
  });

  test('logs on mount and unmount', () => {
    const logSpy = jest.spyOn(console, 'log');
    const WrappedMockApp = WithLogging(MockApp);

    const { unmount } = render(<WrappedMockApp />);
    expect(logSpy).toHaveBeenCalledWith('Component MockApp is mounted');

    unmount();
    expect(logSpy).toHaveBeenCalledWith('Component MockApp is going to unmount');
  });
});
