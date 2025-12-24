<script lang="ts">
import { goto } from '$app/navigation';
import FocusAreaList from '../../lib/FocusAreaList.svelte';
</script>

<button onclick={() => goto('/')} style="margin-bottom:1.5rem">⬅ Tillbaka</button>

<main style="max-width: 700px; margin: 2rem auto;">
  <h1>Fokusområden</h1>
  <FocusAreaList />
</main>
