import { writable } from 'svelte/store';
import type { MomentumState } from './momentumModels';

export const momentum = writable<MomentumState>({
  momentumScore: 0,
  momentumState: 'low',
  sessionLength: 0,
  streaks: 0,
  combos: 0,
  xpGain: 0,
  deepWorkSessions: 0,
  momentumCurve: []
});
