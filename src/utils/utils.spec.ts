import { set9AMTime, formatTime } from './utils'

describe('set9AMTime', () => {
  it('should set the time to exactly 09:00:00', () => {
    const result = set9AMTime();

    expect(result.getHours()).toBe(9);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });

  it('returns a Date instance', () => {
    const result = set9AMTime();

    expect(result).toBeInstanceOf(Date);
  });
});

describe('formatTime', () => {
  it('should format time as HH:mm', () => {
    const time = set9AMTime();

    const result = formatTime(time);

    expect(result).toBe('09:00 AM');
  });
});
