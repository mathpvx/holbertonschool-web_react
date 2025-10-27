import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
  selected: {},
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses(state, action) {
      state.list = action.payload || [];
      const map = {};
      state.list.forEach((c) => {
        map[c.id] = Boolean(state.selected[c.id]);
      });
      state.selected = map;
    },
    selectCourse(state, action) {
      const id = action.payload;
      state.selected[id] = true;
    },
    unselectCourse(state, action) {
      const id = action.payload;
      state.selected[id] = false;
    },
    toggleSelectCourse(state, action) {
      const id = action.payload;
      state.selected[id] = !state.selected[id];
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setCourses,
  selectCourse,
  unselectCourse,
  toggleSelectCourse,
  setLoading,
  setError,
} = coursesSlice.actions;
export default coursesSlice.reducer;
