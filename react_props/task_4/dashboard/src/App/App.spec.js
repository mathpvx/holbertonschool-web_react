// task_4/dashboard/src/App/App.spec.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import CourseList from '../CourseList/CourseList';
import Login from '../Login/Login';

test('App renders Login component when isLoggedIn is false', () => {
  render(<App />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('App renders CourseList component when isLoggedIn is true', () => {
  const AppLoggedIn = () => {
    return (
      <>
        <CourseList courses={[
          { id: 1, name: 'ES6', credit: 60 }
        ]} />
      </>
    );
  };
  render(<AppLoggedIn />);
  expect(screen.getByText(/course name/i)).toBeInTheDocument();
});
