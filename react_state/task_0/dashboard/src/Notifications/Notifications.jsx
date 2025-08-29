import './Notifications.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

class Notifications extends Component {
  static defaultProps = {
    displayDrawer: false,
    list: [],
    handleDisplayDrawer: () => {},
    handleHideDrawer: () => {},
  };

  static propTypes = {
    displayDrawer: PropTypes.bool,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        type: PropTypes.string,
        value: PropTypes.string,
        html: PropTypes.object,
      })
    ),
    handleDisplayDrawer: PropTypes.func,
    handleHideDrawer: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    const currentLength = this.props.list ? this.props.list.length : 0;
    const nextLength = nextProps.list ? nextProps.list.length : 0;

    const listGrew = nextLength > currentLength;
    const drawerToggled =
      nextProps.displayDrawer !== this.props.displayDrawer;

    return listGrew || drawerToggled;
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { displayDrawer, list, handleDisplayDrawer, handleHideDrawer } =
      this.props;

    return (
      <>
        <div
          id="menuItem"
          className="notifications-title"
          role="button"
          tabIndex={0}
          onClick={handleDisplayDrawer}
          onKeyDown={(e) => (e.key === 'Enter' ? handleDisplayDrawer() : null)}
        >
          Your notifications
        </div>

        {displayDrawer && (
          <div className="notification">
            {list.length === 0 ? (
              <p className="empty-notification">No new notification for now</p>
            ) : (
              <>
                <button
                  id="closeButton"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  aria-label="Close"
                  onClick={handleHideDrawer}
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
