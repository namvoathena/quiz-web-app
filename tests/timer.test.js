import { jest } from '@jest/globals';
import { createTimer, getTimerState } from '../src/scripts/timer.js';
import { CONFIG } from '../src/scripts/config.js';

describe('getTimerState', () => {
  test('returns "normal" when time is above 5', () => {
    expect(getTimerState(15)).toBe('normal');
    expect(getTimerState(10)).toBe('normal');
    expect(getTimerState(6)).toBe('normal');
  });

  test('returns "warning" when time is 4 or 5', () => {
    expect(getTimerState(5)).toBe('warning');
    expect(getTimerState(4)).toBe('warning');
  });

  test('returns "danger" when time is 3 or below', () => {
    expect(getTimerState(3)).toBe('danger');
    expect(getTimerState(2)).toBe('danger');
    expect(getTimerState(1)).toBe('danger');
    expect(getTimerState(0)).toBe('danger');
  });
});

describe('createTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('initial state is not running with 0 time left', () => {
    const timer = createTimer(() => {}, () => {});
    expect(timer.isRunning()).toBe(false);
    expect(timer.getTimeLeft()).toBe(0);
  });

  test('start sets timeLeft to CONFIG.TIMER_SECONDS and begins running', () => {
    const timer = createTimer(() => {}, () => {});
    timer.start();
    expect(timer.isRunning()).toBe(true);
    expect(timer.getTimeLeft()).toBe(CONFIG.TIMER_SECONDS);
  });

  test('calls onTick immediately on start with full time', () => {
    const onTick = jest.fn();
    const timer = createTimer(onTick, () => {});
    timer.start();
    expect(onTick).toHaveBeenCalledWith(CONFIG.TIMER_SECONDS, CONFIG.TIMER_SECONDS);
  });

  test('calls onTick each second with decreasing time', () => {
    const onTick = jest.fn();
    const timer = createTimer(onTick, () => {});
    timer.start();
    onTick.mockClear();

    jest.advanceTimersByTime(1000);
    expect(onTick).toHaveBeenCalledWith(CONFIG.TIMER_SECONDS - 1, CONFIG.TIMER_SECONDS);

    jest.advanceTimersByTime(1000);
    expect(onTick).toHaveBeenCalledWith(CONFIG.TIMER_SECONDS - 2, CONFIG.TIMER_SECONDS);
  });

  test('calls onExpire when time reaches 0', () => {
    const onExpire = jest.fn();
    const timer = createTimer(() => {}, onExpire);
    timer.start();

    jest.advanceTimersByTime(CONFIG.TIMER_SECONDS * 1000);
    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  test('stops running after expiration', () => {
    const timer = createTimer(() => {}, () => {});
    timer.start();

    jest.advanceTimersByTime(CONFIG.TIMER_SECONDS * 1000);
    expect(timer.isRunning()).toBe(false);
    expect(timer.getTimeLeft()).toBe(0);
  });

  test('does not call onExpire again after expiration', () => {
    const onExpire = jest.fn();
    const timer = createTimer(() => {}, onExpire);
    timer.start();

    jest.advanceTimersByTime(CONFIG.TIMER_SECONDS * 1000);
    jest.advanceTimersByTime(5000);
    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  test('stop prevents further ticks', () => {
    const onTick = jest.fn();
    const timer = createTimer(onTick, () => {});
    timer.start();
    onTick.mockClear();

    timer.stop();
    jest.advanceTimersByTime(3000);
    expect(onTick).not.toHaveBeenCalled();
    expect(timer.isRunning()).toBe(false);
  });

  test('stop prevents onExpire from firing', () => {
    const onExpire = jest.fn();
    const timer = createTimer(() => {}, onExpire);
    timer.start();

    jest.advanceTimersByTime(5000);
    timer.stop();
    jest.advanceTimersByTime(CONFIG.TIMER_SECONDS * 1000);
    expect(onExpire).not.toHaveBeenCalled();
  });

  test('start resets a running timer', () => {
    const onTick = jest.fn();
    const timer = createTimer(onTick, () => {});
    timer.start();

    jest.advanceTimersByTime(5000);
    onTick.mockClear();

    timer.start();
    expect(timer.getTimeLeft()).toBe(CONFIG.TIMER_SECONDS);
    expect(onTick).toHaveBeenCalledWith(CONFIG.TIMER_SECONDS, CONFIG.TIMER_SECONDS);
  });

  test('getTimeLeft reflects countdown progress', () => {
    const timer = createTimer(() => {}, () => {});
    timer.start();

    jest.advanceTimersByTime(3000);
    expect(timer.getTimeLeft()).toBe(CONFIG.TIMER_SECONDS - 3);
  });
});
