import React, { PureComponent, createRef } from 'react';

class NotificationItem extends PureComponent {
  constructor(props) {
    super(props);
    this.liRef = createRef();
  }

  componentDidMount() {
    this.applyColor();
  }

  componentDidUpdate() {
    this.applyColor();
  }

  applyColor() {
    const colors = {
      urgent: 'red',
      default: 'blue'
    };
    const color = colors[this.props.type || 'default'];

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
    const { type = 'default', html, value } = this.props;

    if (html) {
      return (
        <li
          ref={this.liRef}
          data-notification-type={type}
          dangerouslySetInnerHTML={html}
        />
      );
    }

    if (value && this.containsHTML(value)) {
      return (
        <li
          ref={this.liRef}
          data-notification-type={type}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      );
    }

    return (
      <li
        ref={this.liRef}
        data-notification-type={type}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;
