import React from 'react';
import { render } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

test('contains a div with the class bodySectionWithMargin', () => {
  const { container } = render(
    <BodySectionWithMarginBottom title="test"><p>child</p></BodySectionWithMarginBottom>
  );
  const div = container.querySelector('.bodySectionWithMargin');
  expect(div).toBeInTheDocument();
});

test('renders the BodySection component', () => {
  const { getByRole } = render(
    <BodySectionWithMarginBottom title="test"><p>child</p></BodySectionWithMarginBottom>
  );
  expect(getByRole('heading', { level: 2 })).toHaveTextContent('test');
});
