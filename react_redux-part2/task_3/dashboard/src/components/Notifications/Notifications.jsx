import React, { useRef, useState } from 'react';
import { css, StyleSheet } from 'aphrodite';
import { useDispatch, useSelector } from 'react-redux';
import { markNotificationAsRead } from '../../features/notifications/notificationsSlice';
import { getFilteredNotifications } from '../../features/selectors/notificationsSelector';
import NotificationItem from '../NotificationItem/NotificationItem';
import closeButton from '../../assets/close-button.png';

function Notifications() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.notifications.loading);
  const [currentFilter, setCurrentFilter] = useState('all');
  const filteredNotifications = useSelector((state) =>
    getFilteredNotifications(state, currentFilter)
  );
  const drawerRef = useRef(null);

  const handleToggleDrawer = () => {
    const node = drawerRef.current;
    if (!node) return;
    const visibleClass = css(styles.visible);
    if (node.className.includes(visibleClass)) {
      node.className = node.className.replace(visibleClass, '').trim();
    } else {
      node.className = `${node.className} ${visibleClass}`.trim();
    }
  };

  const handleMarkAsRead = (id) => dispatch(markNotificationAsRead(id));
  const handleSetFilterUrgent = () => setCurrentFilter('urgent');
  const handleSetFilterDefault = () => setCurrentFilter('default');
  const handleSetFilterAll = () => setCurrentFilter('all');

  return (
    <>
      <div className={css(styles.menuItem)} onClick={handleToggleDrawer}>
        Your notifications
      </div>

      <div
        className={css(styles.notifications)}
        id="notifications"
        ref={drawerRef}
        role="region"
        aria-label="Notifications"
      >
        <button
          aria-label="Close"
          onClick={handleToggleDrawer}
          className={css(styles.closeBtn)}
        >
          <img src={closeButton} alt="close" className={css(styles.closeIcon)} />
        </button>

        <div className={css(styles.filters)}>
          <button onClick={handleSetFilterAll} aria-label="filter-all">All</button>
          <button onClick={handleSetFilterDefault} aria-label="filter-default">Default</button>
          <button onClick={handleSetFilterUrgent} aria-label="filter-urgent">‼️ Urgent</button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>Here is the list of notifications</p>
            <ul className={css(styles.list)}>
              {filteredNotifications && filteredNotifications.length > 0 ? (
                filteredNotifications.map((notif) => (
                  <NotificationItem
                    key={notif.id}
                    type={notif.type}
                    value={notif.value}
                    id={notif.id}
                    markAsRead={handleMarkAsRead}
                  />
                ))
              ) : (
                <NotificationItem type="default" value="No new notification for now" />
              )}
            </ul>
          </>
        )}
      </div>
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
    opacity: 0,
    visibility: 'hidden',
  },
  visible: {
    opacity: 1,
    visibility: 'visible',
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
  filters: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
});

export default Notifications;
