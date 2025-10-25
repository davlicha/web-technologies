export class StorageService<T> {
    private storageKey: string;

    constructor(key: string) {
        this.storageKey = key;
    }

    save(data: T[]): void {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (e) {
            console.error("Error saving to localStorage", e);
        }
    }

    load(): T[] {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Error loading from localStorage", e);
            return [];
        }
    }

    clear(): void {
        localStorage.removeItem(this.storageKey);
    }
}
