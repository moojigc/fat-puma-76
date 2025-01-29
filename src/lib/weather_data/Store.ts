import { writable } from 'svelte/store';

export default abstract class Store<T = any> {
	store = writable();

	subscribe(callback) {
		this.store.subscribe(callback);
	}

	set(value) {
		this.store.set(value);
	}
}