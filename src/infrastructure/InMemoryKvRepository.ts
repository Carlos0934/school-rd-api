import { Key, KvRepository } from '../types.ts'

export class InMemoryKvRepository<T> implements KvRepository<T> {
	constructor(private readonly data: Map<Key, T> = new Map<Key, T>()) {}
	get(key: Key): Promise<T | undefined> {
		return Promise.resolve(this.data.get(key))
	}
	set(key: Key, value: T): Promise<void> {
		this.data.set(key, value)
		return Promise.resolve()
	}
}
