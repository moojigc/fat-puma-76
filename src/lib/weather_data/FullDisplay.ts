import type { Observer } from '$lib/weather_data/Observer.interface';
import type { Display } from '$lib/weather_data/Display.interface';
import Store from '$lib/weather_data/Store';
import type { Subject } from '$lib/weather_data/Subject.interface';
import type WeatherData from '$lib/weather_data/WeatherData';

export default class FullDisplay
	extends Store implements Observer<WeatherData>, Display {

	subject?: WeatherData;
	value = [
		'Temperature: 0 Deg',
		'Humidity: 0%',
		'Barometric: 0 inHg'
	];

	get display() {
		return this.value.join(' - ');
	}

	notify(weatherData: WeatherData) {
		this.value = [
			`Temperature: ${weatherData.temperature} Deg`,
			`Humidity: ${weatherData.humidity}%`,
			`Barometric: ${weatherData.barometric} inHg`
		];

		this.updateDisplay();
	}

	updateDisplay() {
		this.set(this.value);
	}
}