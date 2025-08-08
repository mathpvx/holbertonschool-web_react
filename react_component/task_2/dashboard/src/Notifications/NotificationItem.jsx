import React, { Component, createRef } from 'react';

class NotificationItem extends Component {
  constructor(props) {
    super(props);
    this.liRef = createRef();
  }

  componentDidMount() {
    this.updateColor();
  }

  componentDidUpdate() {
    this.updateColor();
  }

  updateColor() {
    const { type = 'default' } = this.props;
    const colors = {
      urgent: 'red',
      default: 'blue'
    };
    if (this.liRef.current) {
      this.liRef.current.style.color = colors[type];
      if (!this.liRef.current.style._values) {
        this.liRef.current.style._values = {};
      }
      this.liRef.current.style._values.color = colors[type];
    }
  }

  containsHTML(str) {
    return typeof str === 'string' && /<\/?[a-z][\s\S]*>/i.test(str);
  }

  render() {
    const { type = 'default', html, value, markAsRead } = this.props;

    if (html) {
      return (
        <li
          ref={this.liRef}
          data-notification-type={type}
          dangerouslySetInnerHTML={html}
          onClick={markAsRead}
        />
      );
    }

    if (value && this.containsHTML(value)) {
      return (
        <li
          ref={this.liRef}
          data-notification-type={type}
          dangerouslySetInnerHTML={{ __html: value }}
          onClick={markAsRead}
        />
      );
    }

    return (
      <li
        ref={this.liRef}
        data-notification-type={type}
        onClick={markAsRead}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;
