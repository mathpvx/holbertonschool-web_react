import './Notifications.css';
import React, { Component } from 'react';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
  static defaultProps = {
    displayDrawer: false,
    list: [],
  };

  shouldComponentUpdate(nextProps) {
      const currentLength = this.props.list ? this.props.list.length : 0;
      const nextLength = nextProps.list ? nextProps.list.length : 0;

      return currentLength !== nextLength;
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { displayDrawer, list } = this.props;

    return (
      <>
        <div className="notifications-title">
          Your notifications
        </div>

        {displayDrawer && (
          <div className="notification">
            {list.length === 0 ? (
              <p className="empty-notification">No new notification for now</p>
            ) : (
              <>
                <button
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  aria-label="Close"
                  onClick={() => console.log('Close button has been clicked')}
                >
                  <img src={closeIcon} alt="close icon" />
                </button>

                <p>Here is the list of notifications</p>
                <ul>
                  {list.map((notif) => (
                    <NotificationItem
                      key={notif.id}
                      id={notif.id}
                      type={notif.type}
                      html={notif.html}
                      value={notif.value}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </>
    );
  }
}

export default Notifications;
