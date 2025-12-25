
import type { TimerEvent } from './timerModels';
import { writable, get } from 'svelte/store';

export const activeTimer = writable<TimerEvent | null>(null);
// Map<taskId, TimerEvent[]>
export const timerEvents = writable<Map<string, TimerEvent[]>>(new Map());


export async function startTimer(taskId: string) {
  if (get(activeTimer)) return;
  const now = new Date().toISOString();
  const timer: Partial<TimerEvent> = {
    taskId,
    start: now
  };
  activeTimer.set(timer as TimerEvent);
}


export async function stopTimer() {
  const timer = get(activeTimer);
  if (!timer) return;
  const stop = new Date().toISOString();
  const duration = Math.floor((new Date(stop).getTime() - new Date(timer.start).getTime()) / 1000);
  const finished: TimerEvent = { ...timer, stop, duration };
  await fetch('/api/timer-sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(finished)
  });
  await fetchAllTimerEvents();
  activeTimer.set(null);
}


export function getActiveTimer(): TimerEvent | null {
  return get(activeTimer);
}


// Fetch all timer events for all tasks and store in a Map
export async function fetchAllTimerEvents() {
  const res = await fetch('/api/timer-sessions');
  if (res.ok) {
    const data: TimerEvent[] = await res.json();
    const map = new Map<string, TimerEvent[]>();
    for (const event of data) {
      if (!map.has(event.taskId)) map.set(event.taskId, []);
      map.get(event.taskId)!.push(event);
    }
    timerEvents.set(map);
  }
}


export function getAllTimerEvents(): Map<string, TimerEvent[]> {
  return get(timerEvents);
}
