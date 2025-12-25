<script lang="ts">
import type { Project } from './models';
import type { FocusArea } from './models';
import { onMount } from 'svelte';

let projects: Project[] = [];
let focusAreas: FocusArea[] = [];
let title = '';
let description = '';
let focusAreaId = '';
let loading = false;

async function fetchProjects() {
  loading = true;
  const res = await fetch('/api/projects');
  projects = await res.json();
  loading = false;
}

async function fetchFocusAreas() {
  const res = await fetch('/api/focus-areas');
  focusAreas = await res.json();
}

onMount(() => {
  fetchProjects();
  fetchFocusAreas();
});

async function handleSubmit(e: Event) {
  e.preventDefault();
  if (!title.trim()) return;
  const res = await fetch('/api/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, focusAreaId })
  });
  if (res.ok) {
    await fetchProjects();
    title = '';
    description = '';
    focusAreaId = '';
  }
}

async function handleDelete(id: string) {
  await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
  await fetchProjects();
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
  background: #2980b9;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  font-size: 1rem;
}
.form button:hover {
  background: #1c5d8c;
}
</style>

<form class="form" onsubmit={handleSubmit}>
  <label for="title">Projektnamn</label>
  <input id="title" bind:value={title} required />

  <label for="description">Beskrivning</label>
  <textarea id="description" bind:value={description} rows="2"></textarea>

  <label for="focusArea">Fokusområde</label>
  <select id="focusArea" bind:value={focusAreaId}>
    <option value="">Välj fokusområde</option>
    {#each focusAreas as area (area.id)}
      <option value={area.id}>{area.title}</option>
    {/each}
  </select>

  <button type="submit">Lägg till projekt</button>
</form>
