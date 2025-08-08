import React, { Component, useRef, useEffect } from 'react';

class NotificationItem extends Component {
  containsHTML(str) {
    return typeof str === 'string' && /<\/?[a-z][\s\S]*>/i.test(str);
  }

  render() {
    const { type = 'default', html, value, markAsRead } = this.props;

    if (html) {
      return (
        <li
          data-notification-type={type}
          dangerouslySetInnerHTML={html}
          onClick={markAsRead}
        />
      );
    }

    if (value && this.containsHTML(value)) {
      return (
        <li
          data-notification-type={type}
          dangerouslySetInnerHTML={{ __html: value }}
          onClick={markAsRead}
        />
      );
    }

    return (
      <li
        data-notification-type={type}
        onClick={markAsRead}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;
