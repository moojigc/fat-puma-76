import type { Subject } from '$lib/weather_data/Subject.interface';

export interface Observer<T = any> {
	id?: string;
	subject?: Subject | null;
	notify(data: T): void;
}