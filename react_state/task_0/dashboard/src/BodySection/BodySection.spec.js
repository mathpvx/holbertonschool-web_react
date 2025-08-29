import { render, screen } from '@testing-library/react';
import BodySection from './BodySection';

test('renders heading with title prop', () => {
  render(<BodySection title="Test Title" />);
  const heading = screen.getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent('Test Title');
});

test('renders children inside the component', () => {
  render(
    <BodySection title="With children">
      <p>Child 1</p>
      <p>Child 2</p>
    </BodySection>
  );
  expect(screen.getByText('Child 1')).toBeInTheDocument();
  expect(screen.getByText('Child 2')).toBeInTheDocument();
});
