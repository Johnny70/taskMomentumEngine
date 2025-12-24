<script lang="ts">
import { askAI } from './aiService';
import { aiStatus, aiLastResponse } from './aiStore';
import { marked } from 'marked';

let prompt = 'Ge mig ett produktivitetstips.';
let loading = false;

$: status = $aiStatus;
$: lastResponse = $aiLastResponse;

async function handleAsk() {
  loading = true;
  await askAI(prompt);
  loading = false;
}
</script>

<style>
.ai-widget {
  margin: 1.5rem 0;
  padding: 1rem;
  background: #e6f7ff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
textarea {
  width: 100%;
  min-height: 2.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 0.5rem;
  font-size: 1rem;
}
button {
  background: #2196f3;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.4rem 1rem;
  cursor: pointer;
  font-size: 1rem;
}
button:disabled {
  background: #aaa;
  cursor: not-allowed;
}
.response {
  margin-top: 0.7rem;
  background: #fff;
  border-radius: 4px;
  padding: 0.7rem;
  min-height: 2rem;
  font-size: 1rem;
}
</style>

<div class="ai-widget">
  <textarea bind:value={prompt} placeholder="Skriv en fråga till AI..."></textarea>
  <button onclick={handleAsk} disabled={loading}>{loading ? 'Väntar...' : 'Fråga AI'}</button>
  <div class="response">
    {#if status === 'loading'}
      <span style="color:#888">AI svarar...</span>
    {:else if status === 'error'}
      <span style="color:red">Fel vid AI-anrop.</span>
    {:else}
      {#if typeof lastResponse === 'string' && lastResponse.trim()}
        {@html marked(lastResponse)}
      {:else if typeof lastResponse === 'object' && Object.keys(lastResponse).length > 0}
        {JSON.stringify(lastResponse, null, 2)}
      {:else}
        <span style="color:#888">(Inget svar från AI)</span>
      {/if}
    {/if}
  </div>
</div>
