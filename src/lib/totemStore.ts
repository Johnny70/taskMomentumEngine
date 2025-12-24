import { writable } from 'svelte/store';
import type { TotemState } from './totemModels';

export const totem = writable<TotemState>({
  glowIntensity: 0,
  pulse: 0,
  fragmentation: 0,
  evolutionStage: 0
});
