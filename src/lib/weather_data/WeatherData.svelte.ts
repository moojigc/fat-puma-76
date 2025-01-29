import type { Observer } from '$lib/weather_data/Observer.interface';
import type { Subject } from '$lib/weather_data/Subject.interface';
import { SvelteSet } from 'svelte/reactivity';

export default class WeatherDataSvelte implements Subject {
	temperature = 0;
	humidity = 0;
	barometric = 0;
	interval?: number;

	observers = new SvelteSet<Observer>()

	measurementsChanged() {
		this.notifyObservers();
	}

	notifyObservers() {
		this.observers.forEach((observer) => {
			observer.notify(this);
		});
	}

	registerObserver(observer: Observer): boolean {
		if (this.observers.has(observer)) {
			return false;
		}

		observer.subject = this;
		this.observers.add(observer);

		return true;
	}

	unregisterObserver(observer: Observer): boolean {
		observer.subject = null;

		return this.observers.delete(observer);
	}

	start() {
		this.interval = setInterval(() => {
			this.temperature = this._getRandomValue();
			this.barometric = this._getRandomValue();
			this.humidity = this._getRandomValue();

			// console.log(
			// 	{
			// 		temperature: this.temperature,
			// 		humidity: this.humidity,
			// 		barometric: this.barometric
			// 	}
			// );

			this.measurementsChanged();
		}, 1000);
	}

	stop() {
		if (!this.interval) return;

		clearInterval(this.interval);
	}

	private _getRandomValue() {
		return Math.floor(Math.random() * 100);
	}
}