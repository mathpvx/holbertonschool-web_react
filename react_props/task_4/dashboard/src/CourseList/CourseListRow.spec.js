// task_4/dashboard/src/CourseList/CourseListRow.spec.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import CourseListRow from './CourseListRow';

test('renders one th with colspan = 2 when isHeader is true and no second cell', () => {
  render(<CourseListRow isHeader={true} textFirstCell="Test" />);
  const cell = screen.getByText('Test');
  expect(cell).toHaveAttribute('colspan', '2');
});

test('renders two th when isHeader is true and both cells are provided', () => {
  render(<CourseListRow isHeader={true} textFirstCell="Name" textSecondCell="Credit" />);
  expect(screen.getAllByRole('columnheader')).toHaveLength(2);
});

test('renders two td when isHeader is false', () => {
  render(<CourseListRow isHeader={false} textFirstCell="React" textSecondCell="40" />);
  expect(screen.getAllByRole('cell')).toHaveLength(2);
});
