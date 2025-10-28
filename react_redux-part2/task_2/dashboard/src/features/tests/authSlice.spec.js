import reducer, { login, logout } from '../auth/authSlice';

describe('authSlice', () => {
  it('returns the correct initial state by default', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      user: { email: '', password: '' },
      isLoggedIn: false,
    });
  });

  it('updates state correctly on login', () => {
    const state = reducer(undefined, login({ email: 'a@b.com', password: '123' }));
    expect(state.user).toEqual({ email: 'a@b.com', password: '123' });
    expect(state.isLoggedIn).toBe(true);
  });

  it('resets state correctly on logout', () => {
    const loggedIn = reducer(undefined, login({ email: 'a@b.com', password: '123' }));
    const state = reducer(loggedIn, logout());
    expect(state.user).toEqual({ email: '', password: '' });
    expect(state.isLoggedIn).toBe(false);
  });
});
