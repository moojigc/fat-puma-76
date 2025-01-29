<script lang="ts">
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
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

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>
		<i>Observe</i> weather data!
	</h1>

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
		<select>
			{#each Object.keys(OBSERVER_TYPES) as type}
				<option
					onclick={(event) => {
						const cls = OBSERVER_TYPES[event.target.value];
						const inst = new cls()
						weatherData.registerObserver(inst)
						observers.add(inst);
					}}
					value={type}
				>{type}</option>
			{/each}
		</select>
	</div>

</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
    }

    h1 {
        width: 100%;
    }

    .welcome {
        display: block;
        position: relative;
        width: 100%;
        height: 0;
        padding: 0 0 calc(100% * 495 / 2048) 0;
    }

    .welcome img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        display: block;
    }
</style>
