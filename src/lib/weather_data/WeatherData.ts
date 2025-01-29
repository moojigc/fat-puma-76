import type { Observer } from '$lib/weather_data/Observer.interface';
import type { Subject } from '$lib/weather_data/Subject.interface';

export default class WeatherData implements Subject {
	temperature = 0;
	humidity = 0;
	barometric = 0;
	interval?: number;

	observers = new Set<Observer>();

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

		this.observers.add(observer);

		return true;
	}

	unregisterObserver(string): boolean {
		return this.observers.delete(string);
	}

	start() {
		this.interval = setInterval(() => {
			this.temperature = this._getRandomValue();
			this.barometric = this._getRandomValue();
			this.humidity = this._getRandomValue();
		}, 50);
	}

	stop() {
		if (!this.interval) return;

		clearInterval(this.interval);
	}

	private _getRandomValue() {
		return Math.floor(Math.random() * 100);
	}
}