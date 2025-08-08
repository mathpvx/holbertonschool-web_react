import React from 'react';
import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

test('renders a heading with the title prop value', () => {
  render(
    <BodySection title="test">
      <p>child</p>
    </BodySection>
  );
  const h2 = screen.getByRole('heading', { level: 2 });
  expect(h2).toHaveTextContent('test');
});

test('renders any number of children', () => {
  render(
    <BodySection title="test">
      <p>child 1</p>
      <p>child 2</p>
      <span>child 3</span>
    </BodySection>
  );
  expect(screen.getByText('child 1')).toBeInTheDocument();
  expect(screen.getByText('child 2')).toBeInTheDocument();
  expect(screen.getByText('child 3')).toBeInTheDocument();
});
