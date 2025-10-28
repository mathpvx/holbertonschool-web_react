import React from 'react';

function NotificationItem({ type = 'default', value = '', id, markAsRead }) {
  const style = { color: type === 'urgent' ? 'red' : 'blue', cursor: 'pointer' };
  const handleClick = () => {
    if (typeof markAsRead === 'function' && id != null) markAsRead(id);
  };
  return (
    <li
      data-notification-type={type}
      style={style}
      onClick={handleClick}
    >
      {value}
    </li>
  );
}

export default NotificationItem;
