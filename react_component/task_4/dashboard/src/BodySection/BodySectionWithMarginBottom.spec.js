import React from 'react';
import { render } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

test('contains a div with the class bodySectionWithMargin', () => {
  const { container } = render(
    <BodySectionWithMarginBottom title="test">
      <p>child</p>
    </BodySectionWithMarginBottom>
  );
  expect(container.querySelector('.bodySectionWithMargin')).toBeInTheDocument();
});

test('renders the BodySection inside (h2 present with title)', () => {
  const { getByRole } = render(
    <BodySectionWithMarginBottom title="test">
      <p>child</p>
    </BodySectionWithMarginBottom>
  );
  expect(getByRole('heading', { level: 2 })).toHaveTextContent('test');
});
