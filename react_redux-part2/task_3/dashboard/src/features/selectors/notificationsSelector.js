import { createSelector } from '@reduxjs/toolkit';

const selectNotifications = (state) => state.notifications.notifications;
const selectFilterArg = (_state, filter) => filter;

export const getFilteredNotifications = createSelector(
  [selectNotifications, selectFilterArg],
  (notifications, filter) => {
    if (filter === 'urgent') return notifications.filter((n) => n.type === 'urgent');
    if (filter === 'default') return notifications.filter((n) => n.type === 'default');
    return notifications;
  }
);
