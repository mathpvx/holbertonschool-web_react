import React from 'react';
import './Notifications.css';
import closeIcon from '../assets/close-button.png';
import { getLatestNotification } from '../utils/utils';
import NotificationItem from './NotificationItem';

function Notifications({ notifications = [] }) {
  return (
    <div className="notifications">
      <button
        style={{
          position: 'absolute',
          right: '10px',
          top: '10px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="Close"
        onClick={() => console.log('Close button has been clicked')}
      >
        <img src={closeIcon} alt="close icon" width="15px" />
      </button>
      <p>Here is the list of notifications</p>
      <ul>
        {notifications.length === 0 ? (
          <NotificationItem type="default" value="No new notification for now" />
        ) : (
          notifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              type={notif.type}
              value={notif.value}
              html={notif.html}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default Notifications;
