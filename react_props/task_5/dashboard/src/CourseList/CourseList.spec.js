// task_4/dashboard/src/CourseList.spec.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import CourseList from './CourseList/CourseList';

const courses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

test('renders 5 rows with courses', () => {
  render(<CourseList courses={courses} />);
  expect(screen.getAllByRole('row')).toHaveLength(5);
});

test('renders 3 rows when no course', () => {
  render(<CourseList courses={[]} />);
  expect(screen.getAllByRole('row')).toHaveLength(3); // 2 headers + 1 fallback row
});