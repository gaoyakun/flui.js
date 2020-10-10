import { eventtarget, EventTarget, Event } from '../types';

export class LoadBegin extends Event {
    static readonly NAME = 'loadbegin';
    manager: LoadManager;
    url: string;
    constructor (manager: LoadManager, url: string) {
        super (LoadBegin.NAME);
        this.manager = manager;
        this.url = url;
    }
}

export class LoadEnd extends Event {
    static readonly NAME = 'loadend';
    manager: LoadManager;
    url: string;
    success: boolean;
    constructor (manager: LoadManager, url: string, success: boolean) {
        super (LoadEnd.NAME);
        this.manager = manager;
        this.url = url;
        this.success = success;
    }
}

export interface LoadManager extends EventTarget {}

@eventtarget()
export class LoadManager {
    private _numItems: number;
    private _numLoadedItems: number;
    private static _tempElement: HTMLAnchorElement = null;
    constructor () {
        this._numItems = 0;
        this._numLoadedItems = 0;
    }
    get numItems () {
        return this._numItems;
    }
    get numLoadedItems () {
        return this._numLoadedItems;
    }
    beginLoad (url: string): string {
        url = LoadManager.resolveURL (url);
        this._numItems++;
        this.dispatchEvent (new LoadBegin(this, url))
        return url;
    }
    endLoad (url: string, succ: boolean) {
        if (succ) {
            this._numLoadedItems++;
        }
        url = LoadManager.resolveURL (url);
        this.dispatchEvent (new LoadEnd (this, url, succ));
    }
    static resolveURL (url: string): string {
        if (!this._tempElement) {
            this._tempElement = document.createElement('a');
        }
        this._tempElement.href = url;
        return this._tempElement.href;
    }
}