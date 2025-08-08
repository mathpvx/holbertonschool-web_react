import './App.css';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { getLatestNotification } from "../utils/utils";

function App({ isLoggedIn = false }) {
  const notificationsList = [
    {
      id: 1,
      type: "default",
      value: "New course available"
    },
    {
      id: 2,
      type: "urgent",
      value: "New resume available"
    },
    {
      id: 3,
      type: "urgent",
      value: getLatestNotification()
    }
  ];

  return (
    <>
      <Notifications notifications={notificationsList} />
      <Header />

      {isLoggedIn ? (
        <BodySectionWithMarginBottom title="Course list">
          <CourseList />
        </BodySectionWithMarginBottom>
      ) : (
        <BodySectionWithMarginBottom title="Log in to continue">
          <Login />
        </BodySectionWithMarginBottom>
      )}

      <BodySection title="News from the School">
        <p>Holberton School News goes here</p>
      </BodySection>

      <Footer />
    </>
  );
}

export default App;
