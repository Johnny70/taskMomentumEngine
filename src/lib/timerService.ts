import { timerEvents, activeTimer } from './timerStore';
import type { TimerEvent } from './timerModels';
import { get } from 'svelte/store';

function generateId() {
  return crypto.randomUUID();
}

export function startTimer(taskId: string, offline = false) {
  if (get(activeTimer)) return; // Only one active timer
  const now = new Date().toISOString();
  const timer: TimerEvent = {
    id: generateId(),
    taskId,
    start: now,
    offline
  };
  activeTimer.set(timer);
}

export function stopTimer() {
  const timer = get(activeTimer);
  if (!timer) return;
  const stop = new Date().toISOString();
  const duration = (new Date(stop).getTime() - new Date(timer.start).getTime()) / 1000;
  const finished: TimerEvent = { ...timer, stop, duration };
  timerEvents.update(evts => [...evts, finished]);
  activeTimer.set(null);
}

export function getActiveTimer(): TimerEvent | null {
  return get(activeTimer);
}

export function getAllTimerEvents(): TimerEvent[] {
  return get(timerEvents);
}
