import type { Observer } from '$lib/weather_data/Observer.interface';

export interface Subject {
	notifyObservers(): void;

	registerObserver(observer: Observer): boolean;

	unregisterObserver(observer: Observer): boolean;
}
