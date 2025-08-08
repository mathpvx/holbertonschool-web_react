import React from 'react';
import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

test('renders a heading with the title prop value', () => {
  render(<BodySection title="test title"><p>child</p></BodySection>);
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('test title');
});

test('renders any number of children passed to it', () => {
  render(
    <BodySection title="test title">
      <p>child1</p>
      <p>child2</p>
    </BodySection>
  );
  expect(screen.getByText('child1')).toBeInTheDocument();
  expect(screen.getByText('child2')).toBeInTheDocument();
});
