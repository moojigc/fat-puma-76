import type { Subject } from '$lib/weather_data/Subject.interface';

export interface Observer<T = any> {
	subject?: Subject;
	notify(data: T): void;
}