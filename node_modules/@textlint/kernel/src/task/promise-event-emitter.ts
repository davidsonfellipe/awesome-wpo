// MIT © 2017 azu
// MIT © 2017 59naga
// https://github.com/59naga/carrack
"use strict";
import { EventEmitter } from "events";

export class PromiseEventEmitter {
    private events: EventEmitter;

    constructor() {
        this.events = new EventEmitter();
        this.events.setMaxListeners(0);
    }

    listenerCount(type: string | symbol): number {
        return this.events.listenerCount(type);
    }

    on(event: string, listener: (...args: any[]) => void) {
        return this.events.on(event, listener);
    }

    emit(event: string, ...args: Array<any>): Promise<Array<void>> {
        const promises: Array<Promise<void>> = [];

        this.events.listeners(event).forEach((listener) => {
            promises.push(listener(...args));
        });

        return Promise.all(promises);
    }
}
