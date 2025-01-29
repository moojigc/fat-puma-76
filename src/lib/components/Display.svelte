<script lang="ts">
	import type { Display } from '$lib/weather_data/Display.interface';
	import type WeatherDataSvelte from '$lib/weather_data/WeatherData.svelte';

	let {
		observer,
		unsubscribe,
		destroy,
		resubscribe
	}: {
		unsubscribe: () => void;
		observer: Display;
		destroy: () => void;
		resubscribe: () => void;
	} = $props();

	let subscribed = $state<boolean>(true);

</script>

<div class="card card-compact bg-base-100 w-96 shadow-xl">
	<div class="card-body">
		<h2 class="card-title">{observer.display}</h2>
		<div class="card-actions justify-end">
			{#if subscribed}
				<button
					onclick={() => {
						unsubscribe();
						subscribed = !subscribed;
					}}
					class="btn btn-warning">Unsubscribe
				</button>
			{:else}
				<button
					onclick={() => {
						resubscribe();
						subscribed = !subscribed;
					}}
					class="btn btn-warning">Subscribe
				</button>
			{/if}
			<button
				style="border-color: red"
				onclick={destroy}>
				Delete
			</button>
		</div>
	</div>
</div>

<style>
    .card {
        width: 30rem;
        border: black solid 1px;
        padding: 0.25em;
        border-radius: 0.25em;
    }
</style>