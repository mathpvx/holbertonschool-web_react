import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Notifications from './components/Notifications/Notifications';
import Login from './pages/Login/Login';
import CourseList from './pages/CourseList/CourseList';
import { fetchNotifications } from './features/notifications/notificationsSlice';
import { fetchCourses } from './features/courses/coursesSlice';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCourses());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <Notifications />
      <Header />
      {isLoggedIn ? <CourseList /> : <Login />}
      <Footer />
    </>
  );
}

export default App;
