import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils';

describe('utils.js tests', () => {
  test('getCurrentYear returns the current year', () => {
    const currentYear = new Date().getFullYear();
    expect(getCurrentYear()).toBe(currentYear);
  });

  test('getFooterCopy returns correct value for true', () => {
    expect(getFooterCopy(true)).toBe('Holberton School');
  });

  test('getFooterCopy returns correct value for false', () => {
    expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
  });

  test('getLatestNotification returns correct HTML string', () => {
    expect(getLatestNotification()).toBe('<strong>Urgent requirement</strong> - complete by EOD');
  });
});
