<script lang="ts">
import TaskTime from './TaskTime.svelte';
// ...existing code...
import type { Task } from './models';
import { onMount } from 'svelte';

let tasks: Task[] = [];
let loading = false;
let errorMsg = '';

async function fetchTasks() {
  loading = true;
  const res = await fetch('/api/tasks');
  tasks = await res.json();
  loading = false;
}

onMount(fetchTasks);

async function handleDelete(id: string) {
  errorMsg = '';
  const res = await fetch(`/api/tasks?id=${id}`, { method: 'DELETE' });
  if (res.ok) {
    await fetchTasks();
  } else {
    try {
      const err = await res.json();
      errorMsg = err?.message || 'Kunde inte ta bort task.';
    } catch {
      errorMsg = 'Kunde inte ta bort task.';
    }
  }
}
// ...existing code...
</script>

<style>
.task-list {
  padding: 1rem;
  border-radius: 8px;
  background: #f8f9fa;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;
}
.task-title {
  font-weight: 500;
}
.delete-btn {
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  font-size: 0.9rem;
}
.delete-btn:hover {
  background: #c0392b;
}
</style>

<div class="task-list">
  {#if errorMsg}
    <div style="color: #c0392b; margin-bottom: 0.7rem;">{errorMsg}</div>
  {/if}
  <h2 style="margin-bottom:1rem; color:#1769aa;">Tasks</h2>
  {#if loading}
    <div>Laddar...</div>
  {:else if tasks.length === 0}
    <div>Inga tasks ännu.</div>
  {:else}
    {#each tasks as task (task.id)}
      <div class="task-item">
        <span class="task-title">{task.title}</span>
        <TaskTime taskId={task.id} />
        <button class="delete-btn" on:click={() => handleDelete(task.id)}>Ta bort</button>
      </div>
    {/each}
  {/if}
</div>
