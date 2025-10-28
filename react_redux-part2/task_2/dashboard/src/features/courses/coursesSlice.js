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
    const list = Array.isArray(data) ? data : [];
    return list.map((c) => ({ ...c, isSelected: false }));
  }
);

const initialState = {
  courses: [],
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    selectCourse(state, action) {
      const id = action.payload;
      state.courses = state.courses.map((c) =>
        c.id === id ? { ...c, isSelected: true } : c
      );
    },
    unSelectCourse(state, action) {
      const id = action.payload;
      state.courses = state.courses.map((c) =>
        c.id === id ? { ...c, isSelected: false } : c
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.courses = action.payload;
    });
    builder.addCase(logout, () => initialState);
  },
});

export const { selectCourse, unSelectCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
