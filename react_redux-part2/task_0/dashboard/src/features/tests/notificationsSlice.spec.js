import reducer, { fetchNotifications, markNotificationAsRead } from '../notifications/notificationsSlice';
import { getLatestNotification } from '../../utils/utils';

jest.mock('../../utils/utils', () => ({
  getLatestNotification: jest.fn(() => '<strong>Latest notification</strong>'),
}));

describe('notificationsSlice (Part 2 Task 0)', () => {
  const initial = {
    notifications: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = undefined;
  });

  it('returns the correct initial state by default', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initial);
  });

  it('sets notifications when fetchNotifications is fulfilled', () => {
    const sample = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'Server is down' },
    ];

    const transformed = sample.map((n) =>
      n.id === 3 ? { ...n, value: getLatestNotification() } : n
    );

    const state = reducer(
      initial,
      { type: fetchNotifications.fulfilled.type, payload: transformed }
    );

    expect(getLatestNotification).toHaveBeenCalled();
    expect(state.notifications).toEqual(transformed);
  });

  it('removes a notification when markNotificationAsRead is dispatched', () => {
    const start = {
      notifications: [
        { id: 1, type: 'default', value: 'A' },
        { id: 2, type: 'urgent', value: 'B' },
      ],
    };
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const state = reducer(start, markNotificationAsRead(1));
    expect(state.notifications).toEqual([{ id: 2, type: 'urgent', value: 'B' }]);
    expect(spy).toHaveBeenCalledWith(1);
    spy.mockRestore();
  });
});
