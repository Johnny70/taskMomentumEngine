<script lang="ts">
import { timerEvents } from './timerService';
import { deepWork } from './deepWorkStore';
import { updateDeepWork } from './deepWorkService';

const d = deepWork;

// Re-run updateDeepWork whenever timerEvents changes
$effect(() => {
  const unsub = timerEvents.subscribe(() => {
    updateDeepWork();
  });
  // Also run once on mount
  updateDeepWork();
  return unsub;
});
</script>

<style>
.deepwork-widget {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f3eaff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.score {
  font-size: 2rem;
  font-weight: 700;
  color: #8e44ad;
}
.state {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
</style>

<div class="deepwork-widget">
  <div class="state">Deep Work: {$d.deepWorkState}</div>
  <div class="score">{($d.deepWorkScore).toFixed(1)}</div>
  <div>Långa sessioner: {$d.longSessions}</div>
  <div>Högfokusperioder: {$d.highFocusPeriods}</div>
</div>
