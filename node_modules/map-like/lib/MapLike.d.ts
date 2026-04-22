declare class MapLike<K, V> {
    clear(): void;

    delete(key: K): boolean;

    forEach(callbackfn: (value: V, index: K, map: MapLike<K, V>) => void, thisArg?: any): void;

    entries(): [K, V][];

    keys(): K[];

    values(): V[];

    get(key: K): V | undefined;

    has(key: K): boolean;

    set(key: K, value?: V): this;

    readonly size: number;
}
export { MapLike };