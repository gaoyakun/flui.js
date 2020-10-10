import { LoadManager } from './load_manager';

export abstract class AbstractLoader<T = any> {
    protected _object: T;
    protected _manager: LoadManager;
    protected _crossOrigin: string;
    constructor (manager?: LoadManager, object?: T) {
        this._object = object || null;
        this._manager = manager || null;
        this._crossOrigin = 'anonymous';
    }
    get object () {
        return this._object;
    }
    set object (obj: T) {
        this._object = obj;
    }
    get manager () {
        return this._manager;
    }
    set manager (mngr: LoadManager) {
        this._manager = mngr;
    }
    get crossOrigin () {
        return this._crossOrigin;
    }
    set crossOrigin (val: string) {
        this._crossOrigin = val;
    }
    abstract async load (url: string, options?: any);
}