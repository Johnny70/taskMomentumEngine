<script lang="ts">
import { tasks } from './stores';
import type { Task } from './models';
import { deleteTask } from './services/taskService';


const allTasks = tasks;

function handleDelete(id: string) {
  deleteTask(id);
}
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
  {#if $allTasks.length === 0}
    <div>Inga tasks ännu.</div>
  {:else}
    {#each $allTasks as task (task.id)}
      <div class="task-item">
        <span class="task-title">{task.title}</span>
        <button class="delete-btn" onclick={() => handleDelete(task.id)}>Ta bort</button>
      </div>
    {/each}
  {/if}
</div>
