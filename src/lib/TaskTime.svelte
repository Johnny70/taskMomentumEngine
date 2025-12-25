<script lang="ts">
import { onMount } from 'svelte';
import { fetchAllTimerEvents, timerEvents } from './timerService';
import { get } from 'svelte/store';

export let taskId: string;
let totalTime = 0;

onMount(async () => {
  await fetchAllTimerEvents();
  updateTotalTime();
});

timerEvents.subscribe(updateTotalTime);

function updateTotalTime() {
  const map = get(timerEvents);
  const events = map.get(taskId) || [];
  totalTime = events.reduce((sum: number, e: any) => sum + (e.duration || 0), 0);
}
</script>

<span style="font-size:0.9em;color:#888;margin-left:0.5em">{Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}</span>
