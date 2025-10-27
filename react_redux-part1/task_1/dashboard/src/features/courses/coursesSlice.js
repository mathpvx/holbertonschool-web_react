import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from '../auth/authSlice';

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
};

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const res = await fetch(ENDPOINTS.courses);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  }
);

const initialState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.courses = action.payload;
    });
    builder.addCase(logout, () => initialState);
  },
});

export default coursesSlice.reducer;
