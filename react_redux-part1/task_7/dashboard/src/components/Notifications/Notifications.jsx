import React from 'react';
import { css, StyleSheet } from 'aphrodite';
import { useDispatch, useSelector } from 'react-redux';
import {
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from '../../features/notifications/notificationsSlice';
import NotificationItem from '../NotificationItem/NotificationItem';
import closeButton from '../../assets/close-button.png';

function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const displayDrawer = useSelector((state) => state.notifications.displayDrawer);

  const handleDisplayDrawer = () => dispatch(showDrawer());
  const handleHideDrawer = () => dispatch(hideDrawer());
  const handleMarkAsRead = (id) => dispatch(markNotificationAsRead(id));

  return (
    <>
      <div className={css(styles.menuItem)} onClick={handleDisplayDrawer}>
        Your notifications
      </div>

      {displayDrawer && (
        <div className={css(styles.notifications)} id="notifications">
          <button
            aria-label="Close"
            onClick={handleHideDrawer}
            className={css(styles.closeBtn)}
          >
            <img src={closeButton} alt="close" className={css(styles.closeIcon)} />
          </button>

          <p>Here is the list of notifications</p>
          <ul className={css(styles.list)}>
            {notifications && notifications.length > 0 ? (
              notifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  type={notif.type}
                  value={notif.value}
                  html={notif.html}
                  markAsRead={() => handleMarkAsRead(notif.id)}
                  id={notif.id}
                />
              ))
            ) : (
              <NotificationItem type="default" value="No new notification for now" />
            )}
          </ul>
        </div>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    textAlign: 'right',
    marginRight: '1rem',
    cursor: 'pointer',
  },
  notifications: {
    border: '1px dashed #e01d3f',
    padding: '1rem',
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
  },
  closeBtn: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  },
  closeIcon: {
    height: '15px',
    width: '15px',
  },
  list: {
    listStyle: 'none',
    paddingLeft: 0,
    margin: 0,
  },
});

export default Notifications;
