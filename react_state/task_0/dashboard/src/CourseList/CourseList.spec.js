import { render, screen } from '@testing-library/react';
import CourseList from './CourseList';

const courses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

describe('CourseList component', () => {
  test('renders 5 rows when given a list of courses', () => {
    render(<CourseList courses={courses} />);
    expect(screen.getAllByRole('row')).toHaveLength(5);
  });

  test('renders 1 rows when list is empty', () => {
    render(<CourseList courses={[]} />);
    expect(screen.getAllByRole('row')).toHaveLength(1);
    expect(screen.getByText(/no course available yet/i)).toBeInTheDocument();
  });
});
