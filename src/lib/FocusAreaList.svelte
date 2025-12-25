<script lang="ts">
import type { FocusArea } from './models';
import { onMount } from 'svelte';

let focusAreas: FocusArea[] = [];
let title = '';
let description = '';
let color = '#2196f3';
let icon = '💼';
let loading = false;

async function fetchFocusAreas() {
  loading = true;
  const res = await fetch('/api/focus-areas');
  focusAreas = await res.json();
  loading = false;
}

onMount(fetchFocusAreas);

async function handleSubmit(e: Event) {
  e.preventDefault();
  if (!title.trim()) return;
  const res = await fetch('/api/focus-areas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, color, icon })
  });
  if (res.ok) {
    await fetchFocusAreas();
    title = '';
    description = '';
    color = '#2196f3';
    icon = '💼';
  }
}

async function handleDelete(id: string) {
  await fetch(`/api/focus-areas?id=${id}`, { method: 'DELETE' });
  await fetchFocusAreas();
}
</script>

<style>
.focusarea-form {
  margin-bottom: 2rem;
  padding: 2rem;
  background: #f7f7f7;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
.focusarea-form label {
  display: block;
  margin-top: 1.2rem;
  font-weight: 500;
  color: #333;
}
.focusarea-form input,
.focusarea-form textarea {
  width: 100%;
  padding: 0.7rem;
  margin-top: 0.3rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1.05rem;
  background: #fff;
  box-sizing: border-box;
}
.focusarea-form input[type="color"] {
  padding: 0.2rem;
  height: 2.2rem;
  width: 3rem;
  border: none;
  margin-top: 0.5rem;
}
.focusarea-form button {
  margin-top: 2rem;
  background: #2196f3;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.7rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  transition: background 0.2s;
}
.focusarea-form button:hover {
  background: #1769aa;
}
.focusarea-list {
  padding: 1.5rem;
  border-radius: 12px;
  background: #f8f9fa;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
.focusarea-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 0;
  border-bottom: 1px solid #e0e0e0;
}
.focusarea-title {
  font-weight: 500;
  font-size: 1.08rem;
  color: #222;
}
.delete-btn {
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}
.delete-btn:hover {
  background: #c0392b;
}
</style>

<form class="focusarea-form" onsubmit={handleSubmit}>
  <h2 style="margin-bottom:1rem; color:#1769aa;">Lägg till fokusområde</h2>
  <label for="title">Titel</label>
  <input id="title" bind:value={title} required placeholder="t.ex. Arbete, Hälsa, Fritid" />

  <label for="description">Beskrivning</label>
  <textarea id="description" bind:value={description} rows="2" placeholder="Beskriv fokusområdet..." />

  <label for="color">Färg</label>
  <input id="color" type="color" bind:value={color} />

  <label for="icon">Ikon</label>
  <input id="icon" bind:value={icon} placeholder="Emoji, t.ex. 💼" />

  <button type="submit">Lägg till fokusområde</button>
</form>

<div class="focusarea-list">
  <h2 style="margin-bottom:1rem; color:#1769aa;">Fokusområden</h2>
  {#if loading}
    <div>Laddar...</div>
  {:else if focusAreas.length === 0}
    <div>Inga fokusområden ännu.</div>
  {:else}
    {#each focusAreas as area (area.id)}
      <div class="focusarea-item">
        <span class="focusarea-title">{area.icon} {area.title}</span>
        <button class="delete-btn" onclick={() => handleDelete(area.id)}>Ta bort</button>
      </div>
    {/each}
  {/if}
</div>
