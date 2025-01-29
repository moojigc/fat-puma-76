import type { Observer } from '$lib/weather_data/Observer.interface';
import type { Display } from '$lib/weather_data/Display.interface';
import Store from '$lib/weather_data/Store';
import type { Subject } from '$lib/weather_data/Subject.interface';
import type WeatherData from '$lib/weather_data/WeatherData';

export default class HumidityDisplay
	extends Store implements Observer<WeatherData>, Display {

	subject?: WeatherData;
	value = 0;

	get display() {
		return `Humidity: ${this.value}%`;
	}

	notify(weatherData: WeatherData) {
		this.value = weatherData.humidity;

		this.updateDisplay();
	}

	updateDisplay() {
		this.set(this.value);
	}
}