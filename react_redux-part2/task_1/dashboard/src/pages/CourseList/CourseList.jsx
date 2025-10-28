import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { useSelector } from 'react-redux';
import WithLogging from '../../components/HOC/WithLogging';
import CourseListRow from './CourseListRow/CourseListRow';

function CourseList() {
  const courses = useSelector((state) => state.courses.courses);

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
              isHeader={false}
              textFirstCell={course.name}
              textSecondCell={course.credit}
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
