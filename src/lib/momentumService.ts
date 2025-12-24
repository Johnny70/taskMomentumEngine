import { momentum } from './momentumStore';
import { timerEvents } from './timerStore';
import type { TimerEvent } from './timerModels';
import type { MomentumState } from './momentumModels';
import { get } from 'svelte/store';

// Simple momentum calculation based on timer events
export function updateMomentum() {
  const events = get(timerEvents);
  let sessionLength = 0;
  let streaks = 0;
  let combos = 0;
  let xpGain = 0;
  let deepWorkSessions = 0;
  let momentumCurve: number[] = [];

  // Example: sessionLength = sum of last session
  if (events.length > 0) {
    const last = events[events.length - 1];
    sessionLength = last.duration || 0;
    momentumCurve = events.map(e => e.duration || 0);
    xpGain = Math.floor(sessionLength / 60); // 1 XP per minut
    // Streaks: count consecutive days with timer events
    const days = new Set(events.map(e => e.start.slice(0, 10)));
    streaks = days.size;
    // Combos: count sessions > 25 min
    combos = events.filter(e => (e.duration || 0) >= 1500).length;
    // Deep work: sessions > 60 min
    deepWorkSessions = events.filter(e => (e.duration || 0) >= 3600).length;
  }

  // Score: simple weighted sum
  let momentumScore = Math.min(100, sessionLength / 60 + streaks * 5 + combos * 10 + deepWorkSessions * 15);
  let momentumState: MomentumState['momentumState'] = 'low';
  if (momentumScore > 80) momentumState = 'peak';
  else if (momentumScore > 60) momentumState = 'stable';
  else if (momentumScore > 30) momentumState = 'rising';

  momentum.set({
    momentumScore,
    momentumState,
    sessionLength,
    streaks,
    combos,
    xpGain,
    deepWorkSessions,
    momentumCurve
  });
}
