import React from 'react';
import { css, StyleSheet } from 'aphrodite';

function CourseListRow({
  isHeader = false,
  textFirstCell,
  textSecondCell = null,
  id,
  isSelected = false,
  changeRow,
}) {
  if (isHeader) {
    if (textSecondCell == null) {
      return (
        <tr className={css(styles.headerRow)}>
          <th colSpan="2">{textFirstCell}</th>
        </tr>
      );
    }
    return (
      <tr className={css(styles.headerRow)}>
        <th>{textFirstCell}</th>
        <th>{textSecondCell}</th>
      </tr>
    );
  }

  const handleChange = (e) => {
    if (typeof changeRow === 'function' && id != null) {
      changeRow(id, e.target.checked);
    }
  };

  return (
    <tr className={css(styles.dataRow)}>
      <td>
        {id != null && (
          <input
            type="checkbox"
            aria-label={`select-course-${id}`}
            checked={isSelected}
            onChange={handleChange}
          />
        )}{' '}
        {textFirstCell}
      </td>
      <td>{textSecondCell}</td>
    </tr>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    background: '#f5f5f5',
  },
  dataRow: {
    background: '#fff',
  },
});

export default CourseListRow;
