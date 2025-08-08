import React, { Component } from 'react';
import './Notifications.css';
import NotificationItem from './NotificationItem';
import closeButton from '../assets/close-button.png';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { notifications = [] } = this.props;

    return (
      <div className='root-notifications'>
        <div className="notifications">
          <p>Here is the list of notifications</p>

          <button
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
            aria-label="Close"
            onClick={() => console.log('Close button has been clicked')}
          >
            <img src={closeButton} alt="close" style={{ width: '15px', height: '15px' }} />
          </button>

          <ul>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                type={notification.type}
                value={notification.value}
                html={notification.html}
                markAsRead={() => this.markAsRead(notification.id)}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Notifications;
