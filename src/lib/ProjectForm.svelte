<script lang="ts">
import { createProject } from './services/projectService';
import { focusAreas } from './stores';
let title = '';
let description = '';
let focusAreaId = '';

function handleSubmit(e: Event) {
  e.preventDefault();
  if (!title.trim()) return;
  createProject({
    title,
    description,
    focusAreaId
  });
  title = '';
  description = '';
  focusAreaId = '';
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
    {#each $focusAreas as area (area.id)}
      <option value={area.id}>{area.title}</option>
    {/each}
  </select>

  <button type="submit">Lägg till projekt</button>
</form>
