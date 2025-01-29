<script lang="ts">
	import WeatherDataSvelte from '$lib/weather_data/WeatherData.svelte';
	import { onMount } from 'svelte';
	import FullDisplay from '$lib/weather_data/FullDisplay';
	import TemperatureDisplay from '$lib/weather_data/TemperatureDisplay';
	import HumidityDisplay from '$lib/weather_data/HumidityDisplay';
	import BarometricDisplay from '$lib/weather_data/BarometricDisplay';
	import Display from '$lib/components/Display.svelte';
	import { SvelteSet } from 'svelte/reactivity';

	const weatherData = new WeatherDataSvelte();
	const observers = new SvelteSet<Display>();
	const OBSERVER_TYPES = {
		Full: FullDisplay,
		Temperature: TemperatureDisplay,
		Humidity: HumidityDisplay,
		Barometric: BarometricDisplay
	};

	onMount(() => {
		weatherData.start();

		const fullDisplay = new FullDisplay();

		observers.add(fullDisplay);
		weatherData.registerObserver(
			fullDisplay
		);

		return () => weatherData.stop();
	});
</script>

<div>
	{#each observers as observer}
		<Display observer={observer}
						 unsubscribe={() => {
								weatherData.unregisterObserver(observer);
							}}
						 resubscribe={() => {
							 weatherData.registerObserver(observer);
						 }}
						 destroy={() => {
						observers.delete(observer);
					}}
		/>
	{/each}

	<div>
		<h3>Add new observers!</h3>
		<div>
			{#each Object.keys(OBSERVER_TYPES) as type}
				<button
					onclick={(event) => {
						const cls = OBSERVER_TYPES[type];
						const inst = new cls()
						weatherData.registerObserver(inst)
						observers.add(inst);
					}}
					value={type}
				>{type}</button>
			{/each}
		</div>
	</div>
</div>
