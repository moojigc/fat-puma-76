import type { Observer } from '$lib/weather_data/Observer.interface';
import type { Display } from '$lib/weather_data/Display.interface';
import StoreSvelte from '$lib/weather_data/Store.svelte';
import type { Subject } from '$lib/weather_data/Subject.interface';
import type WeatherDataSvelte from '$lib/weather_data/WeatherData.svelte';

export default class HumidityDisplay
	extends StoreSvelte implements Observer<WeatherDataSvelte>, Display {

	constructor() {
		super();

		this.display = `Humidity: ${this.value} inHg`;
	}


	subject?: WeatherDataSvelte;
	value = 0;

	notify(weatherData: WeatherDataSvelte) {
		this.value = weatherData.humidity;

		this.updateDisplay();
	}

	updateDisplay() {
		this.display = `Humidity: ${this.value}%`;
	}
}