// task_5/dashboard/src/Notifications/Notifications.jsx
import React from 'react';
import PropTypes from 'prop-types';
import NotificationItem from './NotificationItem';
import './Notifications.css';

function Notifications({ displayDrawer, notifications = [] }) {
  return (
    <>
      <div className="notifications-title">
        <p>Your notifications</p>
      </div>
      {displayDrawer && (
        <div className="Notifications">
          <button
            style={{
              position: 'absolute',
              right: '1rem',
              top: '1rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label="Close"
            onClick={() => console.log('Close button has been clicked')}
          >
            <img src={require('../assets/close-icon.png')} alt="close" style={{ height: '15px' }} />
          </button>
          {notifications.length > 0 ? (
            <>
              <p>Here is the list of notifications</p>
              <ul>
                {notifications.map((notif) => (
                  <NotificationItem
                    key={notif.id}
                    type={notif.type}
                    value={notif.value}
                    html={notif.html}
                  />
                ))}
              </ul>
            </>
          ) : (
            <p>No new notification for now</p>
          )}
        </div>
      )}
    </>
  );
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      value: PropTypes.string,
      html: PropTypes.shape({ __html: PropTypes.string }),
    })
  ),
};

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: [],
};

export default Notifications;
