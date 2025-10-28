import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import rootReducer from '../../app/rootReducer';
import CourseList from './CourseList';

function makeStore(preloadedState) {
  return configureStore({ reducer: rootReducer, preloadedState });
}

test('selects and unselects courses via checkboxes', async () => {
  const store = makeStore({
    auth: { isLoggedIn: true, user: { email: 'a@b.com', password: 'x' } },
    notifications: { notifications: [], loading: false },
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
        { id: 2, name: 'Webpack', credit: 20, isSelected: false },
      ],
    },
  });

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>
  );

  const user = userEvent.setup();
  const cb1 = screen.getByLabelText('select-course-1');
  const cb2 = screen.getByLabelText('select-course-2');

  expect(cb1).not.toBeChecked();
  expect(cb2).not.toBeChecked();

  await user.click(cb1);
  expect(store.getState().courses.courses.find(c => c.id === 1).isSelected).toBe(true);

  await user.click(cb1);
  expect(store.getState().courses.courses.find(c => c.id === 1).isSelected).toBe(false);

  await user.click(cb2);
  expect(store.getState().courses.courses.find(c => c.id === 2).isSelected).toBe(true);
});
