<script lang="ts">
import MomentumWidget from '../lib/MomentumWidget.svelte';
import TimerWidget from '../lib/TimerWidget.svelte';
import DeepWorkWidget from '../lib/DeepWorkWidget.svelte';
import TotemWidget from '../lib/TotemWidget.svelte';
import { goto } from '$app/navigation';
</script>

<style>
	.dashboard {
		max-width: 700px;
		margin: 2rem auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	.widget-row {
		display: flex;
		gap: 2rem;
		flex-wrap: wrap;
	}
	.widget {
		flex: 1 1 250px;
		min-width: 250px;
		background: #fff;
		border-radius: 8px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.widget h2 {
		margin-top: 0;
		font-size: 1.1rem;
	}
	.widget button {
		margin-top: 1rem;
		background: #2196f3;
		color: #fff;
		border: none;
		border-radius: 4px;
		padding: 0.4rem 1rem;
		cursor: pointer;
		font-size: 1rem;
	}
	.widget button:hover {
		background: #1769aa;
	}
</style>

<main class="dashboard">
	<div class="widget-row">
		<div class="widget">
			<h2>Momentum</h2>
			<MomentumWidget />
			<button onclick={() => goto('/momentum')}>Visa mer</button>
		</div>
		<div class="widget">
			<h2>Deep Work</h2>
			<DeepWorkWidget />
			<button onclick={() => goto('/deep-work')}>Visa mer</button>
		</div>
		<div class="widget">
			<h2>Totem</h2>
			<TotemWidget />
			<button onclick={() => goto('/totem')}>Visa mer</button>
		</div>
		<div class="widget">
			<h2>Timer</h2>
			<TimerWidget />
			<button onclick={() => goto('/timer')}>Visa mer</button>
		</div>
	</div>
	<div class="widget-row">
		<div class="widget">
			<h2>Tasks</h2>
			<button onclick={() => goto('/tasks')}>Hantera tasks</button>
		</div>
		<div class="widget">
			<h2>Projekt</h2>
			<button onclick={() => goto('/projects')}>Hantera projekt</button>
		</div>
		<div class="widget">
			<h2>Fokusområden</h2>
			<button onclick={() => goto('/focus-areas')}>Hantera fokusområden</button>
		</div>
	</div>
</main>
