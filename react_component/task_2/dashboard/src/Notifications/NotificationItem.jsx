import React, { Component, createRef } from 'react';

class NotificationItem extends Component {
  constructor(props) {
    super(props);
    this.liRef = createRef();
  }

  componentDidMount() {
    const { type } = this.props;
    const colors = { urgent: 'red', default: 'blue' };
    const color = colors[type] || 'blue';

    if (this.liRef.current) {
      this.liRef.current.style.color = color;
      if (!this.liRef.current.style._values) {
        this.liRef.current.style._values = {};
      }
      this.liRef.current.style._values.color = color;
    }
  }

  containsHTML(str) {
    return typeof str === 'string' && /<\/?[a-z][\s\S]*>/i.test(str);
  }

  render() {
    const { type = 'default', html, value, markAsRead, id } = this.props;

    if (html) {
      return (
        <li
          ref={this.liRef}
          data-notification-type={type}
          dangerouslySetInnerHTML={html}
          onClick={() => markAsRead(id)}
        />
      );
    }

    if (value && this.containsHTML(value)) {
      return (
        <li
          ref={this.liRef}
          data-notification-type={type}
          dangerouslySetInnerHTML={{ __html: value }}
          onClick={() => markAsRead(id)}
        />
      );
    }

    return (
      <li
        ref={this.liRef}
        data-notification-type={type}
        onClick={() => markAsRead(id)}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;
