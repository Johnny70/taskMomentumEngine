<script lang="ts">
import { createFocusArea } from './services/focusAreaService';
import { focusAreas } from './stores';
let title = $state('');
let description = $state('');
let color = $state('#2196f3');
let icon = $state('star');

function handleSubmit(e: Event) {
  e.preventDefault();
  if (!title.trim()) return;
  createFocusArea({
    title,
    description,
    color,
    icon
  });
  title = '';
  description = '';
  color = '#2196f3';
  icon = 'star';
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
  background: #8e44ad;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.2rem;
  cursor: pointer;
  font-size: 1rem;
}
.form button:hover {
  background: #6c3483;
}
</style>

<form class="form" onsubmit={handleSubmit}>
  <label for="title">Fokusområdesnamn</label>
  <input id="title" bind:value={title} required />

  <label for="description">Beskrivning</label>
  <textarea id="description" bind:value={description} rows="2"></textarea>

  <label for="color">Färg</label>
  <input id="color" type="color" bind:value={color} required pattern="#([0-9a-fA-F]{6})" />

  <label for="icon">Ikon</label>
  <input id="icon" bind:value={icon} />

  <button type="submit">Lägg till fokusområde</button>
</form>
