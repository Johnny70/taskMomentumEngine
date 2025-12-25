
import { momentum } from './momentumStore';
import { timerEvents } from './timerService';
import type { TimerEvent } from './timerModels';
import type { MomentumState } from './momentumModels';
import { get } from 'svelte/store';

// Simple momentum calculation based on timer events (aggregated from Map)
export function updateMomentum() {
  const eventsMap = get(timerEvents);
  // Flatten all TimerEvent[] arrays from the Map into a single array
  const events: TimerEvent[] = Array.from(eventsMap.values()).flat();
  let sessionLength = 0;
  let streaks = 0;
  let combos = 0;
  let xpGain = 0;
  let deepWorkSessions = 0;
  let momentumCurve: number[] = [];

  if (events.length > 0) {
    // Sort by start time ascending
    events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
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
  momentumScore = Math.round(momentumScore * 10) / 10;
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
