import { totem } from './totemStore';
import { momentum } from './momentumStore';
import { deepWork } from './deepWorkStore';
import { get } from 'svelte/store';

export function updateTotem() {
  const m = get(momentum);
  const d = get(deepWork);

  // Exempel: glowIntensity = momentumScore, pulse = deepWorkScore
  const glowIntensity = Math.round(m.momentumScore);
  const pulse = d.deepWorkScore;
  // Fragmentation: fler streaks = mindre fragmentation
  const fragmentation = 100 - Math.min(100, m.streaks * 10);
  // Evolution: steg beroende på momentum och deep work
  let evolutionStage = 0;
  if (m.momentumScore > 80 && d.deepWorkScore > 80) evolutionStage = 5;
  else if (m.momentumScore > 60 && d.deepWorkScore > 60) evolutionStage = 4;
  else if (m.momentumScore > 40 && d.deepWorkScore > 40) evolutionStage = 3;
  else if (m.momentumScore > 20 && d.deepWorkScore > 20) evolutionStage = 2;
  else if (m.momentumScore > 10 || d.deepWorkScore > 10) evolutionStage = 1;

  totem.set({
    glowIntensity,
    pulse,
    fragmentation,
    evolutionStage
  });
}
