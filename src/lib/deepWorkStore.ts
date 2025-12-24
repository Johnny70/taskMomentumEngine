import { writable } from 'svelte/store';
import type { DeepWorkState } from './deepWorkModels';

export const deepWork = writable<DeepWorkState>({
  deepWorkScore: 0,
  deepWorkState: 'none',
  longSessions: 0,
  highFocusPeriods: 0,
  suitableTasks: 0
});
