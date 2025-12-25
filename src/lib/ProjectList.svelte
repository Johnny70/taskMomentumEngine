
<script lang="ts">
import { onMount } from 'svelte';
import type { Project } from './models';

let projects: Project[] = [];
let loading = false;

async function fetchProjects() {
  loading = true;
  const res = await fetch('/api/projects');
  projects = await res.json();
  loading = false;
}

async function handleDelete(id: string) {
  await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
  await fetchProjects();
}

onMount(fetchProjects);
</script>

<style>
.project-list {
  padding: 1rem;
  border-radius: 8px;
  background: #f8f9fa;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.project-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;
}
.project-title {
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

<div class="project-list">
  {#if loading}
    <div>Laddar projekt...</div>
  {:else if projects.length === 0}
    <div>Inga projekt ännu.</div>
  {:else}
    {#each projects as project (project.id)}
      <div class="project-item">
        <span class="project-title">{project.title}</span>
        <button class="delete-btn" on:click={() => handleDelete(project.id)}>Ta bort</button>
      </div>
    {/each}
  {/if}
</div>
