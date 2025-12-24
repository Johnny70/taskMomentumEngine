<script lang="ts">
import { createTask } from './services/taskService';
import type { Task } from './models';
import { projects } from './stores';


let title = $state('');
let description = $state('');
let projectId = $state('');
let estimatedHours = $state(1);
let impact = $state(50);
let priority = $state(50);
let energyRequirement = $state(50);

const allProjects = projects;

function handleSubmit(e: Event) {
  e.preventDefault();
  if (!title.trim()) return;
  createTask({
    title,
    description,
    projectId,
    status: 'todo',
    estimatedHours,
    actualTimeSpent: 0,
    impact,
    priority,
    energyRequirement
  });
  title = '';
  description = '';
  projectId = '';
  estimatedHours = 1;
  impact = 50;
  priority = 50;
  energyRequirement = 50;
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
  <label for="title">Titel</label>
  <input id="title" bind:value={title} required />

  <label for="description">Beskrivning</label>
  <textarea id="description" bind:value={description} rows="2"></textarea>

  <label for="project">Projekt</label>
  <select id="project" bind:value={projectId}>
    <option value="">Välj projekt</option>
    {#each $allProjects as project (project.id)}
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
