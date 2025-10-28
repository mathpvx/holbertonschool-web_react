import reducer, { fetchNotifications, markNotificationAsRead } from '../notifications/notificationsSlice';
import { getLatestNotification } from '../../utils/utils';

jest.mock('../../utils/utils', () => ({
  getLatestNotification: jest.fn(() => '<strong>Latest notification</strong>'),
}));

describe('notificationsSlice (Part 2 Task 1)', () => {
  const initial = {
    notifications: [],
    loading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the correct initial state by default', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initial);
  });

  it('sets notifications when fetchNotifications is fulfilled and turns loading off', () => {
    const sample = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'Server is down' },
    ];
    const transformed = sample.map((n) =>
      n.id === 3 ? { ...n, value: getLatestNotification() } : n
    );

    const pendingState = reducer(initial, { type: fetchNotifications.pending.type });
    expect(pendingState.loading).toBe(true);

    const fulfilledState = reducer(pendingState, {
      type: fetchNotifications.fulfilled.type,
      payload: transformed,
    });
    expect(getLatestNotification).toHaveBeenCalled();
    expect(fulfilledState.notifications).toEqual(transformed);
    expect(fulfilledState.loading).toBe(false);
  });

  it('turns loading off on rejected', () => {
    const pendingState = reducer(initial, { type: fetchNotifications.pending.type });
    const rejectedState = reducer(pendingState, { type: fetchNotifications.rejected.type });
    expect(rejectedState.loading).toBe(false);
  });

  it('removes a notification when markNotificationAsRead is dispatched', () => {
    const start = {
      notifications: [
        { id: 1, type: 'default', value: 'A' },
        { id: 2, type: 'urgent', value: 'B' },
      ],
      loading: false,
    };
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const state = reducer(start, markNotificationAsRead(1));
    expect(state.notifications).toEqual([{ id: 2, type: 'urgent', value: 'B' }]);
    expect(spy).toHaveBeenCalledWith(1);
    spy.mockRestore();
  });
});
