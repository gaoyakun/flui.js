export interface Vec2 {
    x: number;
    y: number;
}

export interface Vec3 extends Vec2 {
    z: number;
}

export interface Vec4 extends Vec3 {
    w: number;
}

export type EventHandler = (evt: Event)=>void;
export interface EventHandlerObject {
    handleEvent: EventHandler;
}
export type EventListener = EventHandler|EventHandlerObject;

export class Event {
    private static readonly FLAG_STOP_PROPAGATION = (1<<0);
    private static readonly FLAG_STOP_IMMEDIATE_PROPAGATION = (1<<1);
    private static readonly FLAG_CANCELED = (1<<2);
    private static readonly FLAG_DISPATCHED = (1<<3);
    private _type: string;
    private _flags: number;
    private _bubbles: boolean;
    private _cancelable: boolean;
    private _target: unknown;
    private _currentTarget: unknown;
    private _timestamp: number;
    constructor (type: string, initOptions?: { bubbles?: boolean, cancelable?: boolean }) {
        this._type = type;
        this._flags = 0;
        this._bubbles = !!initOptions?.bubbles;
        this._cancelable = !!initOptions?.cancelable;
        this._target = null;
        this._currentTarget = null;
        this._timestamp = Date.now ();
    }
    get type (): string {
        return this._type;
    }
    get bubbles (): boolean {
        return this._bubbles;
    }
    get cancelable (): boolean {
        return this._cancelable;
    }
    get cancelBubble (): boolean {
        return !!(this._flags & Event.FLAG_STOP_PROPAGATION);
    }
    get cancelImmediate (): boolean {
        return !!(this._flags & Event.FLAG_STOP_IMMEDIATE_PROPAGATION);
    }
    set cancelBubble (val: boolean) {
        val && this.stopPropagation ();
    }
    get defaultPrevented (): boolean {
        return !!(this._flags & Event.FLAG_CANCELED);
    }
    get target (): unknown {
        return this._target;
    }
    get currentTarget (): unknown {
        return this._currentTarget;
    }
    get timestamp (): number {
        return this._timestamp;
    }
    preventDefault () {
        this._flags |= Event.FLAG_CANCELED;
    }
    stopPropagation () {
        this._flags |= Event.FLAG_STOP_PROPAGATION;
    }
    stopImmediatePropagation () {
        this._flags |= Event.FLAG_STOP_PROPAGATION;
        this._flags |= Event.FLAG_STOP_IMMEDIATE_PROPAGATION;
    }
    /** @internal */
    _prepareDispatch (target: unknown) {
        if (this._flags & Event.FLAG_DISPATCHED) {
            throw new Error ('Failed to dispatch event: invalid event state');
        }
        this._target = target;
        this._flags |= Event.FLAG_DISPATCHED;
    }
    /** @internal */
    _invokeListener (listener: EventListener, thisObject: unknown) {
        this._currentTarget = thisObject;
        const handler: EventHandler = typeof listener === 'function' ? listener : listener.handleEvent;
        handler.call (thisObject, this);
        this._currentTarget = null;
    }
}

export interface EventTarget {
    addEventListener (type: string, callback: EventListener): void;
    removeEventListener (type: string, callback: EventListener): void;
    dispatchEvent (evt: Event): boolean;
}

export function eventtarget () {
    return function (ctor: any) {
        ctor.prototype.addEventListener = function (type: string, callback: EventListener) {
            const listeners: { [type: string]: EventListener[] } = this.__listeners || {};
            this.__listeners = listeners;
            if (!(type in listeners)) {
                listeners[type] = [];
            }
            listeners[type].push (callback);
        };
        ctor.prototype.removeEventListener = function (type: string, callback: EventListener) {
            const listeners: { [type: string]: EventListener[] } = this.__listeners || {};
            if (type in listeners) {
                const stack = listeners[type] as EventListener[];
                const index = stack.indexOf (callback);
                if (index >= 0) {
                    stack.splice (index, 1);
                }
            }
        };
        ctor.prototype.dispatchEvent = function (evt: Event) {
            evt._prepareDispatch (this);
            let obj = this;
            while (obj) {
                const listeners: { [type: string]: EventListener[] } = obj.__listeners || {};
                if (evt.type in listeners) {
                    const stack = listeners[evt.type].slice();
                    for (let i = 0, l = stack.length; i < l; i++) {
                        evt._invokeListener (stack[i], obj);
                        if (evt.cancelImmediate) {
                            break;
                        }
                    }
                }
                if (evt.bubbles && !evt.cancelBubble) {
                    obj = obj.parentNode || obj.gui || null;
                } else {
                    break;
                }
            }
            return !evt.defaultPrevented;
        }
    }
}

export interface Texture {

}

/** @internal */
export function assert (expr: boolean, message?: string, fatal?: boolean) {
    if (!expr) {
        const msg = `Assertion failed: ${message}`;
        console.log (msg);
        if (fatal) {
            throw new Error (msg);
        }
    }
    return expr;
}

