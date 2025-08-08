import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

describe('CourseListRow component', () => {
  test('renders one th with colspan=2 when isHeader=true and textSecondCell=null', () => {
    render(<CourseListRow isHeader={true} textFirstCell="Test header" />);
    const cell = screen.getByText(/test header/i);
    expect(cell.tagName).toBe('TH');
    expect(cell).toHaveAttribute('colspan', '2');
  });

  test('renders two th when isHeader=true and textSecondCell provided', () => {
    render(<CourseListRow isHeader={true} textFirstCell="Header1" textSecondCell="Header2" />);
    const cells = screen.getAllByRole('columnheader');
    expect(cells).toHaveLength(2);
    expect(cells[0]).toHaveTextContent('Header1');
    expect(cells[1]).toHaveTextContent('Header2');
  });

  test('renders two td elements when isHeader=false', () => {
    render(<CourseListRow isHeader={false} textFirstCell="Data1" textSecondCell="Data2" />);
    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(2);
    expect(cells[0]).toHaveTextContent('Data1');
    expect(cells[1]).toHaveTextContent('Data2');
  });

  test('has correct style when isHeader=true and textSecondCell=null', () => {
  render(<CourseListRow isHeader={true} textFirstCell="Test header" />);
  const row = screen.getByRole('row');
  expect(row).toHaveStyle('background-color: rgba(222, 181, 181, 0.27)');
  });

  test('has correct style when isHeader=true and textSecondCell is provided', () => {
    render(<CourseListRow isHeader={true} textFirstCell="Header1" textSecondCell="Header2" />);
    const row = screen.getByRole('row');
    expect(row).toHaveStyle('background-color: rgba(222, 181, 181, 0.27)');
  });

  test('has correct style when isHeader=false', () => {
    render(<CourseListRow isHeader={false} textFirstCell="Data1" textSecondCell="Data2" />);
    const row = screen.getByRole('row');
    expect(row).toHaveStyle('background-color: rgba(245, 245, 245, 0.67)');
  });
});
