import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import WithLogging from './WithLogging';

class MockApp extends React.Component {
  render() {
    return <h1>Hello from Mock App Component</h1>;
  }
}

const Wrapped = WithLogging(MockApp);

afterEach(() => {
  cleanup();
});

test('WithLogging renders wrapped component content', () => {
  render(<Wrapped />);
  expect(
    screen.getByRole('heading', { level: 1, name: /hello from mock app component/i })
  ).toBeInTheDocument();
});
