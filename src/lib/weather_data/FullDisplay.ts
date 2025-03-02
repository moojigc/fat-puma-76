import type { Observer } from '$lib/weather_data/Observer.interface';
import type { Display } from '$lib/weather_data/Display.interface';
import StoreSvelte from '$lib/weather_data/Store.svelte';
import type { Subject } from '$lib/weather_data/Subject.interface';
import type WeatherDataSvelte from '$lib/weather_data/WeatherData.svelte';

export default class FullDisplay
	extends StoreSvelte implements Observer<WeatherDataSvelte>, Display {

	constructor() {
		super();

		this.display = this.value.join(' - ')
	}


	subject?: WeatherDataSvelte;
	value = [
		'Temperature: 0 Deg',
		'Humidity: 0%',
		'Barometric: 0 inHg'
	]

	notify(weatherData: WeatherDataSvelte) {
		this.value = [
			`Temperature: ${weatherData.temperature} Deg`,
			`Humidity: ${weatherData.humidity}%`,
			`Barometric: ${weatherData.barometric} inHg`
		];

		this.updateDisplay();
	}

	updateDisplay() {
		this.display = this.value.join(' - ')
	}
}