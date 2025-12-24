<script lang="ts">
import { goto } from '$app/navigation';
import DeepWorkWidget from '../../lib/DeepWorkWidget.svelte';
</script>

<button onclick={() => goto('/')} style="margin-bottom:1.5rem">⬅ Tillbaka</button>

<main style="max-width: 700px; margin: 2rem auto;">
  <h1>Deep Work</h1>
  <DeepWorkWidget />
</main>
