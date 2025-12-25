<script lang="ts">
import type { Task } from './models';
import type { Project } from './models';
import { onMount } from 'svelte';


let tasks: Task[] = [];
let projects: Project[] = [];
let title = '';
let description = '';
let projectId = '';
let estimatedHours = 1;
let impact = 50;
let priority = 50;
let energyRequirement = 50;
let loading = false;
let errorMsg = '';

async function fetchTasks() {
  loading = true;
  const res = await fetch('/api/tasks');
  tasks = await res.json();
  loading = false;
}

async function fetchProjects() {
  const res = await fetch('/api/projects');
  projects = await res.json();
}

onMount(() => {
  fetchTasks();
  fetchProjects();
});

async function handleSubmit(e: Event) {
  e.preventDefault();
  if (!title.trim()) return;
  errorMsg = '';
  const now = new Date().toISOString();
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title,
      description,
      projectId,
      status: 'todo',
      estimatedHours,
      actualTimeSpent: 0,
      impact,
      priority,
      energyRequirement,
      createdAt: now,
      updatedAt: now
    })
  });
  if (res.ok) {
    await fetchTasks();
    title = '';
    description = '';
    projectId = '';
    estimatedHours = 1;
    impact = 50;
    priority = 50;
    energyRequirement = 50;
  } else {
    try {
      const err = await res.json();
      errorMsg = err?.message || 'Kunde inte skapa task.';
    } catch {
      errorMsg = 'Kunde inte skapa task.';
    }
  }
}

async function handleDelete(id: string) {
  await fetch(`/api/tasks?id=${id}`, { method: 'DELETE' });
  await fetchTasks();
}
</script>

<style>
.form {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.form input, .form textarea, .form select {
  width: 100%;
  margin-bottom: 0.7rem;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
.form label {
  font-weight: 500;
  margin-bottom: 0.2rem;
  display: block;
}
.form button {
  background: #27ae60;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  font-size: 1rem;
}
.form button:hover {
  background: #219150;
}
</style>

<form class="form" onsubmit={handleSubmit}>
  {#if errorMsg}
    <div style="color: #c0392b; margin-bottom: 0.7rem;">{errorMsg}</div>
  {/if}
  <label for="title">Titel</label>
  <input id="title" bind:value={title} required />

  <label for="description">Beskrivning</label>
  <textarea id="description" bind:value={description} rows="2"></textarea>

  <label for="project">Projekt</label>
  <select id="project" bind:value={projectId} required>
    <option value="">Välj projekt</option>
    {#each projects as project (project.id)}
      <option value={project.id}>{project.title}</option>
    {/each}
  </select>

  <label for="estimatedHours">Estimerade timmar</label>
  <input id="estimatedHours" type="number" min="1" bind:value={estimatedHours} />

  <label for="impact">Impact</label>
  <input id="impact" type="range" min="0" max="100" bind:value={impact} />

  <label for="priority">Prioritet</label>
  <input id="priority" type="range" min="0" max="100" bind:value={priority} />

  <label for="energyRequirement">Energikrav</label>
  <input id="energyRequirement" type="range" min="0" max="100" bind:value={energyRequirement} />

  <button type="submit">Lägg till task</button>
</form>
