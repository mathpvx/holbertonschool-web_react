import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  filter: 'DEFAULT',
  items: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(notification) {
        return {
          payload: { id: nanoid(), isRead: false, ...notification },
        };
      },
    },
    markAsRead(state, action) {
      const id = action.payload;
      const n = state.items.find((x) => x.id === id);
      if (n) n.isRead = true;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    clearNotifications(state) {
      state.items = [];
    },
  },
});

export const { addNotification, markAsRead, setFilter, clearNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
