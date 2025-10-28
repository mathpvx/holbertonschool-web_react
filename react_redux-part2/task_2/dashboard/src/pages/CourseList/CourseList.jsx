import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { useDispatch, useSelector } from 'react-redux';
import WithLogging from '../../components/HOC/WithLogging';
import CourseListRow from './CourseListRow/CourseListRow';
import { selectCourse, unSelectCourse } from '../../features/courses/coursesSlice';

function CourseList() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);

  const onChangeRow = (id, checked) => {
    if (checked) dispatch(selectCourse(id));
    else dispatch(unSelectCourse(id));
  };

  return (
    <table className={css(styles.table)}>
      <thead>
        <CourseListRow isHeader={true} textFirstCell="Available courses" />
        <CourseListRow isHeader={true} textFirstCell="Course name" textSecondCell="Credit" />
      </thead>
      <tbody>
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <CourseListRow
              key={course.id}
              id={course.id}
              isHeader={false}
              textFirstCell={course.name}
              textSecondCell={course.credit}
              isSelected={!!course.isSelected}
              changeRow={onChangeRow}
            />
          ))
        ) : (
          <CourseListRow isHeader={false} textFirstCell="No course available yet" />
        )}
      </tbody>
    </table>
  );
}

const styles = StyleSheet.create({
  table: {
    width: '100%',
    border: '1px solid #ddd',
    borderCollapse: 'collapse',
    marginTop: '2rem',
  },
});

export default WithLogging(CourseList);
