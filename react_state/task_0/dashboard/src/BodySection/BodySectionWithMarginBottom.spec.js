import { render, screen } from '@testing-library/react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

test('renders a div with class bodySectionWithMargin', () => {
  const { container } = render(
    <BodySectionWithMarginBottom title="Test">
      <p>Test child</p>
    </BodySectionWithMarginBottom>
  );
  const wrapperDiv = container.querySelector('.bodySectionWithMargin');
  expect(wrapperDiv).toBeInTheDocument();
});

test('renders BodySection component inside', () => {
  render(
    <BodySectionWithMarginBottom title="Test">
      <p>Inner content</p>
    </BodySectionWithMarginBottom>
  );
  expect(screen.getByText('Inner content')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test');
});
