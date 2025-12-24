<script lang="ts">
import { aiSettings, aiStatus } from '../lib/aiStore';

let endpoint = $state(aiSettings.endpoint);
let model = $state(aiSettings.model);
let temperature = $state(aiSettings.temperature);
let maxTokens = $state(aiSettings.maxTokens);

function saveSettings() {
  aiSettings.endpoint = endpoint;
  aiSettings.model = model;
  aiSettings.temperature = temperature;
  aiSettings.maxTokens = maxTokens;
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
  <button onclick={saveSettings}>Spara inställningar</button>
  <div class="status">Status: {aiStatus}</div>
</div>
