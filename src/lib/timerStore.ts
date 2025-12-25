
import { writable } from 'svelte/store';
import type { TimerEvent } from './timerModels';

export const activeTimer = writable<TimerEvent | null>(null);
