import Footer from './Footer';
import { render, screen } from '@testing-library/react';
import { getCurrentYear, getFooterCopy } from '../utils/utils';



test('renders footer with correct text when isIndex is true', () => {
  render(<Footer />);
  const footerText = screen.getByText(
    new RegExp(`Copyright ${getCurrentYear()} - ${getFooterCopy(true)}`, 'i')
  );
  expect(footerText).toBeInTheDocument();
});
