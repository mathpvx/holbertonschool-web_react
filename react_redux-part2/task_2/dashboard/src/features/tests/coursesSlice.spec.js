import reducer, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';

describe('coursesSlice', () => {
  const initial = { courses: [] };

  it('returns the correct initial state by default', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initial);
  });

  it('sets courses when fetchCourses is fulfilled', () => {
    const sample = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    const state = reducer(
      initial,
      { type: fetchCourses.fulfilled.type, payload: sample }
    );

    expect(state.courses).toEqual(sample);
  });

  it('resets courses to empty on logout', () => {
    const start = { courses: [{ id: 1, name: 'ES6', credit: 60 }] };
    const state = reducer(start, logout());
    expect(state).toEqual(initial);
  });
});
