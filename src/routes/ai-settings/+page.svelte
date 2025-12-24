<script lang="ts">
import { aiSettings, aiStatus } from '../../lib/aiStore';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';
import AIWidget from '../../lib/AIWidget.svelte';

let endpoint = '';
let model = '';
let temperature = 0.7;
let maxTokens = 256;
let top_p = 1.0;
let systemPrompt = '';
let saved = false;

let unsubscribe: () => void;

onMount(() => {
  unsubscribe = aiSettings.subscribe((settings) => {
    endpoint = settings.endpoint;
    model = settings.model;
    temperature = settings.temperature;
    maxTokens = settings.maxTokens;
    top_p = settings.top_p;
    systemPrompt = settings.systemPrompt;
  });
  return () => unsubscribe();
});

function saveSettings() {
  aiSettings.set({
    endpoint,
    model,
    temperature,
    maxTokens,
    top_p,
    systemPrompt
  });
  saved = true;
  setTimeout(() => { saved = false; }, 2000);
}
</script>

<style>
.settings {
  max-width: 500px;
  margin: 2rem auto;
  background: #f7f7f7;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
label {
  display: block;
  margin-top: 1rem;
  font-weight: 500;
}
input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.3rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
button {
  margin-top: 1.5rem;
  background: #2196f3;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
}
.status {
  margin-top: 1rem;
  color: #2196f3;
  font-size: 1rem;
}
</style>

<div class="settings">
    <button onclick={() => goto('/')} style="margin-bottom:1.5rem">⬅ Tillbaka</button>
  <h2>AI Inställningar</h2>
  <label>API Endpoint
    <input type="text" bind:value={endpoint} />
  </label>
  <label>Modell
    <input type="text" bind:value={model} />
  </label>
  <label>Temperature
    <input type="number" min="0" max="2" step="0.01" bind:value={temperature} />
  </label>
  <label>Max Tokens
    <input type="number" min="1" max="4096" step="1" bind:value={maxTokens} />
  </label>
  <label>Top P
    <input type="number" min="0" max="1" step="0.01" bind:value={top_p} />
  </label>
  <label>Systemprompt
    <textarea rows="4" bind:value={systemPrompt} style="width:100%"></textarea>
  </label>
  <button onclick={saveSettings}>Spara inställningar</button>
  {#if saved}
    <div class="status" style="color:green">Sparat!</div>
  {/if}
  <div class="status">Status: {aiStatus}</div>
  <hr style="margin:2rem 0;">
  <h3>Testa AI</h3>
  <AIWidget />
</div>
