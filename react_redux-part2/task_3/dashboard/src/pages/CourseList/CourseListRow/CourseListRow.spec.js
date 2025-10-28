import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CourseListRow from './CourseListRow';

test('renders header cell spanning two columns when only one header cell is provided', () => {
  render(<table><thead><CourseListRow isHeader={true} textFirstCell="Available courses" /></thead></table>);
  const th = screen.getByText(/Available courses/i).closest('th');
  expect(th).toHaveAttribute('colspan', '2');
});

test('renders two header cells when both provided', () => {
  render(
    <table>
      <thead>
        <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
      </thead>
    </table>
  );
  expect(screen.getByText('Course name')).toBeInTheDocument();
  expect(screen.getByText('Credit')).toBeInTheDocument();
});

test('renders data row with checkbox and calls changeRow on toggle', async () => {
  const changeRow = jest.fn();
  const { rerender } = render(
    <table>
      <tbody>
        <CourseListRow
          isHeader={false}
          id={5}
          textFirstCell="React"
          textSecondCell={40}
          isSelected={false}
          changeRow={changeRow}
        />
      </tbody>
    </table>
  );

  const user = userEvent.setup();
  const checkbox = screen.getByLabelText('select-course-5');

  expect(checkbox).not.toBeChecked();
  await user.click(checkbox);
  expect(changeRow).toHaveBeenCalledWith(5, true);

  rerender(
    <table>
      <tbody>
        <CourseListRow
          isHeader={false}
          id={5}
          textFirstCell="React"
          textSecondCell={40}
          isSelected={true}
          changeRow={changeRow}
        />
      </tbody>
    </table>
  );

  await user.click(screen.getByLabelText('select-course-5'));
  expect(changeRow).toHaveBeenCalledWith(5, false);
});
