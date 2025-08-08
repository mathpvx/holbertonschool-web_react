import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';
import NotificationItem from './NotificationItem';
import closeButton from "../assets/close-button.png";

// Global animations
const ANIMS_CSS = `
@keyframes notifFade { 0% { opacity: .5; } 100% { opacity: 1; } }
@keyframes notifBounce {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-5px); }
  100% { transform: translateY(5px); }
}
`;

class Notifications extends Component {
  state = {
    displayDrawer: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    const currentLength = this.props.notifications?.length || 0;
    const nextLength = nextProps.notifications?.length || 0;
    return currentLength !== nextLength || this.state.displayDrawer !== nextState.displayDrawer;
  }

  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  }

  openDrawer = () => {
    this.setState({ displayDrawer: true });
  }

  closeDrawer = () => {
    this.setState({ displayDrawer: false });
  }

  render() {
    const styles = StyleSheet.create({
      notificationContainer: {
        width: '100%',
        padding: '1rem',
        position: 'absolute',
        top: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
      },
      notificationsTitle: {
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 2000,
        cursor: 'pointer',
        padding: '0.25rem 0.5rem',
        borderRadius: '2px',
        ':hover': {
          animationName: ['notifFade', 'notifBounce'],
          animationDuration: '1s, 0.5s',
          animationIterationCount: '3, 3',
          animationTimingFunction: 'ease-in-out, ease-in-out'
        }
      },
      notifications: {
        width: '500px',
        position: 'relative',
        padding: '0.5rem',
        border: '1px dashed red',
        '@media (max-width: 900px)': {
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          padding: 0,
          background: 'white',
          fontSize: '20px',
          overflowY: 'auto',
          zIndex: 1000
        }
      },
      notificationsP: {
        marginBottom: '1rem',
        '@media (max-width: 900px)': { margin: '0.75rem 0.75rem 1rem' }
      },
      notificationsUl: {
        marginLeft: '2rem',
        '@media (max-width: 900px)': {
          margin: 0,
          padding: 0,
          listStyle: 'none'
        }
      },
      closeButton: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        '@media (max-width: 900px)': {
          position: 'fixed',
          top: '0.5rem',
          right: '0.5rem',
          zIndex: 1100
        }
      },
      closeButtonImg: { width: '15px', height: '15px' }
    });

    const { notifications = [] } = this.props;
    const { displayDrawer } = this.state;

    let drawerContent = null;
    if (displayDrawer) {
      let content = "No new notification for now";
      if (notifications.length > 0) {
        const items = notifications.map((n) => {
          const common = { id: n.id, type: n.type, markAsRead: this.markAsRead };
          return n.html
            ? <NotificationItem key={n.id} {...common} html={n.html} />
            : <NotificationItem key={n.id} {...common} value={n.value} />;
        });
        content = (
          <>
            <p className={css(styles.notificationsP)}>Here is the list of notifications</p>
            <ul className={css(styles.notificationsUl)}>{items}</ul>
          </>
        );
      }
      drawerContent = (
        <div className={css(styles.notifications)}>
          <button
            className={css(styles.closeButton)}
            aria-label="Close"
            onClick={this.closeDrawer}
          >
            <img src={closeButton} alt="close" className={css(styles.closeButtonImg)} />
          </button>
          {content}
        </div>
      );
    }

    return (
      <div className="root-notifications">
        <style>{ANIMS_CSS}</style>
        <div className={css(styles.notificationContainer)}>
          {!displayDrawer && (
            <div
              className={css(styles.notificationsTitle)}
              onClick={this.openDrawer}
            >
              Your notifications
            </div>
          )}
          {drawerContent}
        </div>
      </div>
    );
  }
}

export default Notifications;
