import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';
import './CourseList.css';

function CourseList({ courses = [] }) {
  return (
    <div className="CourseListContainer">
      <table id="CourseList">
        {courses.length === 0 ? (
          <tbody>
			<tr>
				<td className="no-course" colSpan="2">No course available yet</td>
			</tr>
		  </tbody>
        ) : (
          <>
            <thead>
              <CourseListRow textFirstCell="Available courses" isHeader={true} />
              <CourseListRow
                textFirstCell="Course name"
                textSecondCell="Credit"
                isHeader={true}
              />
            </thead>
            <tbody>
              {courses.map((course) => (
                <CourseListRow
                  key={course.id}
                  textFirstCell={course.name}
                  textSecondCell={course.credit.toString()}
                />
              ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      credit: PropTypes.number.isRequired,
    })
  ),
};

export default CourseList;
