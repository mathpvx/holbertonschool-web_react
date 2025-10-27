import reducer, {
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from '../notifications/notificationsSlice';
import { getLatestNotification } from '../../utils/utils';

jest.mock('../../utils/utils', () => ({
  getLatestNotification: jest.fn(() => '<strong>Latest notification</strong>'),
}));

describe('notificationsSlice', () => {
  const initial = {
    notifications: [],
    displayDrawer: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the correct initial state by default', () => {
    const state = reducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initial);
  });

  it('fetches notifications data correctly', async () => {
    const sample = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', value: 'Server is down' },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(sample),
    });

    const action = await fetchNotifications();
    const fulfilled = await action.payload;

    const state = reducer(initial, {
      type: fetchNotifications.fulfilled.type,
      payload: fulfilled,
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(getLatestNotification).toHaveBeenCalled();
    expect(state.notifications.find((n) => n.id === 3)?.value).toBe(
      '<strong>Latest notification</strong>'
    );
    expect(state.notifications.length).toBe(3);
  });

  it('removes a notification when markNotificationAsRead is dispatched', () => {
    const start = {
      notifications: [
        { id: 1, type: 'default', value: 'A' },
        { id: 2, type: 'urgent', value: 'B' },
      ],
      displayDrawer: true,
    };
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const state = reducer(start, markNotificationAsRead(1));
    expect(state.notifications).toEqual([{ id: 2, type: 'urgent', value: 'B' }]);
    expect(spy).toHaveBeenCalledWith(1);
    spy.mockRestore();
  });

  it('toggles displayDrawer with showDrawer and hideDrawer', () => {
    const hidden = reducer({ ...initial, displayDrawer: false }, showDrawer());
    expect(hidden.displayDrawer).toBe(true);
    const shown = reducer({ ...initial, displayDrawer: true }, hideDrawer());
    expect(shown.displayDrawer).toBe(false);
  });
});
