<script lang="ts">
import { onMount } from 'svelte';
import type { Task } from './models';
import { startTimer, stopTimer, getActiveTimer, fetchAllTimerEvents, timerEvents } from './timerService';
import { get } from 'svelte/store';

let tasks: Task[] = [];
let selectedTaskId = '';
let errorMsg = '';
let timer: { start: string } | null = null;
let elapsed = 0;
let interval: ReturnType<typeof setInterval> | null = null;
let totalTime = 0;

async function fetchTasks() {
  errorMsg = '';
  try {
    const res = await fetch('/api/tasks');
    if (!res.ok) {
      errorMsg = 'Kunde inte hämta tasks från API.';
      tasks = [];
      return;
    }
    tasks = await res.json();
    if (!Array.isArray(tasks) || tasks.length === 0) {
      errorMsg = 'Inga tasks hittades i databasen.';
    }
  } catch (e: any) {
    errorMsg = 'Fel vid hämtning av tasks: ' + (e && typeof e === 'object' && 'message' in e ? (e as any).message : String(e));
    tasks = [];
  }
}



onMount(() => {
  fetchTasks();
  fetchAllTimerEvents();
  updateTimer();
});


timerEvents.subscribe(updateTotalTime);

timerEvents.subscribe(updateTotalTime);


function updateTotalTime() {
  const map = get(timerEvents);
  const events = map.get(selectedTaskId) || [];
  totalTime = events.reduce((sum: number, e: any) => sum + (e.duration || 0), 0);
}

function updateTimer() {
  timer = getActiveTimer();
  if (interval) clearInterval(interval);
  if (timer && timer.start) {
    elapsed = Math.floor((Date.now() - new Date(timer.start).getTime()) / 1000);
    interval = setInterval(() => {
      if (timer && timer.start) {
        elapsed = Math.floor((Date.now() - new Date(timer.start).getTime()) / 1000);
      }
    }, 1000);
  } else {
    elapsed = 0;
  }
}


async function handleStart() {
  if (selectedTaskId) {
    await startTimer(selectedTaskId);
    updateTimer();
    await fetchAllTimerEvents();
    updateTotalTime();
  }
}


async function handleStop() {
  await stopTimer();
  updateTimer();
  await fetchAllTimerEvents();
  updateTotalTime();
}
</script>
<style>
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
    {#if timer}
      Tid: {Math.floor(elapsed / 60)}:{(elapsed % 60).toString().padStart(2, '0')}
    {:else}
      Ingen timer aktiv
    {/if}
    <br />
    <span style="font-size:0.95em;color:#888">Total tid för task: {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}</span>
  </div>
  {#if errorMsg}
    <div style="color: #c0392b; margin-bottom: 0.7rem;">{errorMsg}</div>
  {/if}
  <select bind:value={selectedTaskId} disabled={!!timer}>
    <option value="">Välj task</option>
    {#each tasks as task (task.id)}
      <option value={task.id}>{task.title}</option>
    {/each}
  </select>
  <button on:click={handleStart} disabled={!selectedTaskId || !!timer}>Starta</button>
  <button on:click={handleStop} disabled={!timer}>Stoppa</button>
</div>
