<script lang="ts">
import { tasks } from './stores';
import { startTimer, stopTimer, getActiveTimer } from './timerService';

const allTasks = tasks;
let selectedTaskId = $state('');
let interval: any = null;
let elapsed = $state(0);

$effect(() => {
  const timer = getActiveTimer();
  if (timer) {
    interval = setInterval(() => {
      elapsed = Math.floor((Date.now() - new Date(timer.start).getTime()) / 1000);
    }, 1000);
  } else {
    clearInterval(interval);
    elapsed = 0;
  }
  return () => clearInterval(interval);
});

function handleStart() {
  if (selectedTaskId) {
    startTimer(selectedTaskId);
  }
}

function handleStop() {
  stopTimer();
}
</script>

<style>
.timer-widget {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
select {
  margin-bottom: 0.7rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
button {
  background: #34495e;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 0.5rem;
}
button:disabled {
  background: #aaa;
  cursor: not-allowed;
}
.timer-display {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
</style>

<div class="timer-widget">
  <div class="timer-display">
    {#if getActiveTimer()}
      Tid: {Math.floor(elapsed / 60)}:{(elapsed % 60).toString().padStart(2, '0')}
    {:else}
      Ingen timer aktiv
    {/if}
  </div>
  <select bind:value={selectedTaskId} disabled={!!getActiveTimer()}>
    <option value="">Välj task</option>
    {#each $allTasks as task (task.id)}
      <option value={task.id}>{task.title}</option>
    {/each}
  </select>
  <button onclick={handleStart} disabled={!selectedTaskId || !!getActiveTimer()}>Starta</button>
  <button onclick={handleStop} disabled={!getActiveTimer()}>Stoppa</button>
</div>
