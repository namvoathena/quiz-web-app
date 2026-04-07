import { CONFIG } from './config.js';

export function createTimer(onTick, onExpire) {
  let timeLeft = 0;
  let intervalId = null;

  function start() {
    stop();
    timeLeft = CONFIG.TIMER_SECONDS;
    onTick(timeLeft, CONFIG.TIMER_SECONDS);

    intervalId = setInterval(() => {
      timeLeft--;
      onTick(timeLeft, CONFIG.TIMER_SECONDS);

      if (timeLeft <= 0) {
        stop();
        onExpire();
      }
    }, 1000);
  }

  function stop() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function getTimeLeft() {
    return timeLeft;
  }

  function isRunning() {
    return intervalId !== null;
  }

  return { start, stop, getTimeLeft, isRunning };
}

export function getTimerState(timeLeft) {
  if (timeLeft <= 3) return 'danger';
  if (timeLeft <= 5) return 'warning';
  return 'normal';
}
