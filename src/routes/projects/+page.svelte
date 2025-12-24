<script lang="ts">
import { goto } from '$app/navigation';
import ProjectForm from '../../lib/ProjectForm.svelte';
import ProjectList from '../../lib/ProjectList.svelte';
</script>

<button onclick={() => goto('/')} style="margin-bottom:1.5rem">⬅ Tillbaka</button>

<main style="max-width: 700px; margin: 2rem auto;">
  <h1>Projekt</h1>
  <ProjectForm />
  <ProjectList />
</main>
