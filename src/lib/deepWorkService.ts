import { deepWork } from './deepWorkStore';
import { timerEvents } from './timerStore';
import { get } from 'svelte/store';
import type { DeepWorkState } from './deepWorkModels';

// Simple deep work calculation based on timer events
export function updateDeepWork() {
  const events = get(timerEvents);
  let longSessions = 0;
  let highFocusPeriods = 0;
  let suitableTasks = 0;

  // Long sessions: > 60 min
  longSessions = events.filter(e => (e.duration || 0) >= 3600).length;
  // High focus: > 90 min
  highFocusPeriods = events.filter(e => (e.duration || 0) >= 5400).length;
  // Suitable tasks: just a placeholder for now
  suitableTasks = longSessions;

  // Score: weighted sum
  let deepWorkScore = Math.min(100, longSessions * 20 + highFocusPeriods * 30);
  let deepWorkState: DeepWorkState['deepWorkState'] = 'none';
  if (deepWorkScore > 80) deepWorkState = 'deep';
  else if (deepWorkScore > 50) deepWorkState = 'focus';
  else if (deepWorkScore > 20) deepWorkState = 'light';

  deepWork.set({
    deepWorkScore,
    deepWorkState,
    longSessions,
    highFocusPeriods,
    suitableTasks
  });
}
