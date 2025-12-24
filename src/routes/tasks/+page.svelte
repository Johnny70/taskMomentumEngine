<script lang="ts">
import { goto } from '$app/navigation';
import TaskForm from '../../lib/TaskForm.svelte';
import TaskList from '../../lib/TaskList.svelte';
</script>

<button onclick={() => goto('/')} style="margin-bottom:1.5rem">⬅ Tillbaka</button>

<main style="max-width: 700px; margin: 2rem auto;">
  <h1>Tasks</h1>
  <TaskForm />
  <TaskList />
</main>
