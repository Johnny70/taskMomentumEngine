import { writable } from 'svelte/store';
import type { TimerEvent } from './timerModels';

export const timerEvents = writable<TimerEvent[]>([]);
export const activeTimer = writable<TimerEvent | null>(null);
