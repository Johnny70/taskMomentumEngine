<script lang="ts">
import { momentum } from './momentumStore';
import { updateMomentum } from './momentumService';

$effect(() => {
  updateMomentum();
});

const m = momentum;
</script>

<style>
.momentum-widget {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #eaf6ff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.score {
  font-size: 2rem;
  font-weight: 700;
  color: #2196f3;
}
.state {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
</style>

<div class="momentum-widget">
  <div class="state">Momentum: {$m.momentumState}</div>
  <div class="score">{$m.momentumScore}</div>
  <div>Sessionlängd: {$m.sessionLength} sek</div>
  <div>Streaks: {$m.streaks}</div>
  <div>Combos: {$m.combos}</div>
  <div>XP: {$m.xpGain}</div>
  <div>Deep work: {$m.deepWorkSessions}</div>
</div>
