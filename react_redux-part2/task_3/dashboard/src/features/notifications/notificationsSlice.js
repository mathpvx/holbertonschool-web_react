import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  notifications: `${API_BASE_URL}/notifications.json`,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const res = await fetch(ENDPOINTS.notifications);
    const data = await res.json();
    const list = Array.isArray(data) ? data : [];
    return list
      .filter((n) => n?.context?.isRead === false)
      .map((n) => ({
        id: n.id,
        type: n.context.type,
        isRead: n.context.isRead,
        value: n.context.value,
      }));
  }
);

const initialState = {
  notifications: [],
  loading: false,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markNotificationAsRead(state, action) {
      const id = action.payload;
      state.notifications = state.notifications.filter((n) => n.id !== id);
      console.log(id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchNotifications.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { markNotificationAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
