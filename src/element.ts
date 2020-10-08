import { RMLNode, GUI, tagname, AttributeChangeEvent, RMLNodeList, RMLStaticNodeList } from '.';

export interface RMLClassList {
    [n: number]: string;
}

export class RMLClassList {
    private static _elementMap: WeakMap<RMLClassList, RMLElement> = new WeakMap();
    private _classList: string[];
    private _value: string;
    private _valueChanged: boolean;
    constructor (el: RMLElement) {
        this._classList = [];
        this._value = '';
        this._valueChanged = false;
        const proxy = new Proxy (this, {
            get: function (target, name) {
                if (typeof name === 'string' && /^\d+$/.test(name)) {
                    return target._classList[parseInt(name)];
                } else {
                    return target[name];
                }
            }
        });
        RMLClassList._elementMap.set (proxy, el);
        return proxy;
    }
    get value (): string {
        if (this._valueChanged) {
            this._valueChanged = false;
            this._value = this._classList.join (' ');
        }
        return this._value;
    }
    set value (val: string) {
        this._setValue (val, true);
    }
    get length (): number {
        return this._classList.length;
    }
    /** @internal */
    _setValue (val: string, dispatch: boolean) {
        this._classList = val.split (/\s+/).filter(val => !!val);
        this._valueChanged = true;
        if (dispatch) {
            this._notify();
        }
    }
    /** @internal */
    _notify () {
        const el = RMLClassList._elementMap.get (this);
        el._dispatchEvent (AttributeChangeEvent.NAME, new AttributeChangeEvent(el, 'class', false), false);
    }
    add (...args: string[]) {
        for (const arg of args) {
            if (!arg || arg.indexOf(' ')>=0) {
                throw new Error ('Failed to add class: class name is invalid');
            }
            if (arg === '') {
                throw new Error ('Failed to add class: class name is empty');
            }
            if (this._classList.indexOf (arg) < 0) {
                this._classList.push (arg);
                this._valueChanged = true;
                this._notify ();
            }
        }
    }
    remove (...args: string[]) {
        for (const arg of args) {
            const index = this._classList.indexOf (arg);
            if (index >= 0) {
                this._classList.splice (index, 1);
                this._valueChanged = true;
                this._notify ();
            }
        }
    }
    toggle (className: string): boolean {
        this._valueChanged = true;
        const index = this._classList.indexOf (className);
        if (index >= 0) {
            this._classList.splice (index, 1);
            this._notify ();
            return false;
        } else {
            this._classList.push (className);
            this._notify ();
            return true;
        }
    }
    contains (className: string): boolean {
        return this._classList.indexOf (className) >= 0;
    }
    replace (oldClassName: string, newClassName: string) {
        if (newClassName !== oldClassName) {
            if (!oldClassName || oldClassName.indexOf(' ')>=0) {
                throw new Error ('Failed to replace class: old class name is invalid');
            }
            oldClassName = oldClassName.trim();
            if (oldClassName === '') {
                throw new Error ('Failed to replace class: old class name is empty');
            }
            const index = this._classList.indexOf (oldClassName);
            if (index < 0) {
                throw new Error ('Failed to replace class: old class name not exists');
            }
            newClassName = newClassName || '';
            newClassName = newClassName.trim ();
            const newClassNames = newClassName.split (/\s+/).filter (val => !!val);
            this._classList.splice (index, 1, ...newClassNames);

            this._notify ();
        }
    }
}

export interface RMLAttr {
    name: string;
    value: string;
}

@tagname('div')
export class RMLElement<U extends RMLElement<any> = RMLElement<any> > extends RMLNode<U> {
    /** @internal */
    protected _tagname: string;
    /** @internal */
    protected _attributes: { [name: string]: string };
    /** @internal */
    protected _classList: RMLClassList;
    constructor (uiscene: GUI) {
        super (uiscene);
        this._tagname = null;
        this._attributes = {};
        this._classList = new RMLClassList(this);
        this.on (AttributeChangeEvent.NAME, null, (eventName: string, data: AttributeChangeEvent) => {
            if (data.name === 'class') {
                this._uiscene._markStyleRefreshForElement (this);
            }
        });
    }
    get children (): RMLNodeList {
        return this._childrenElements;
    }
    get childElementCount (): number {
        return this._childrenElements.length;
    }
    get nodeType (): number {
        return RMLNode.ELEMENT_NODE;
    }
    get localName (): string {
        return this._tagname;
    }
    get tagName (): string {
        return this._tagname;
    }
    get id (): string {
        return this._attributes.id || '';
    }
    set id (id: string) {
        this._attributes.id = id || '';
    }
    get classList (): RMLClassList {
        return this._classList;
    }
    get className (): string {
        return this._classList.value;
    }
    get attributes (): RMLAttr[] {
        const result: RMLAttr[] = [];
        for (const name in this._attributes) {
            result.push ({name: name, value: this._attributes[name]});
        }
        return result;
    }
    get firstElementChild (): RMLElement {
        return this._getFirstChild (true) as RMLElement;
    }
    get lastElementChild (): RMLElement {
        return this._getLastChild (true) as RMLElement;
    }
    get nextElementSibling (): RMLElement {
        return this._getNextSibling (true) as RMLElement;
    }
    get previousElementSibling (): RMLElement {
        return this._getPreviousSibling (true) as RMLElement;
    }
    getAttribute (k: string): string {
        return k === 'class' ? this._classList.value : this._attributes && this._attributes[k] || null;
    }
    setAttribute (k: string, v?: string) {
        v = v || null;
        if (this._attributes[k] !== v) {
            this._attributes[k] = v;
            if (k === 'class') {
                this._classList._setValue (v || '', false);
            } else if (k === 'style') {
                this._uiscene._markStyleRefreshForElement (this);
            }
            this._dispatchEvent (AttributeChangeEvent.NAME, new AttributeChangeEvent(this, k, false), false);
        }
    }
    removeAttribute (k: string) {
        if (this._attributes[k] !== undefined) {
            delete this._attributes[k];
            if (k === 'style') {
                this._uiscene._markStyleRefreshForElement (this);
            }
            this._dispatchEvent (AttributeChangeEvent.NAME, new AttributeChangeEvent(this, k, true), false);
        }
    }
    hasAttribute (k: string): boolean {
        return this._attributes[k] !== undefined;
    }
    hasAttributes (): boolean {
        return Object.getOwnPropertyNames(this._attributes).length !== 0;
    }
    insertAdjacentElement(position: string, element: RMLElement) {
        if (!element) {
            return null;
        }
        if (position === 'beforebegin') {
            this.before (element);
            return element;
        } else if (position === 'afterend') {
            this.after (element);
            return element;
        } else if (position === 'afterbegin') {
            this.prepend (element);
            return element;
        } else if (position === 'beforeend') {
            this.append (element);
            return element;
        }
        return null;
    }
    insertAdjacentText(position: string, text: string) {
        if (!text) {
            return null;
        }
        if (position === 'beforebegin') {
            this.before (text);
            return text;
        } else if (position === 'afterend') {
            this.after (text);
            return text;
        } else if (position === 'afterbegin') {
            this.prepend (text);
            return text;
        } else if (position === 'beforeend') {
            this.append (text);
            return text;
        }
        return null;
    }
    matches (selectorString: string): boolean {
        return this.ownerDocument.querySelectorAll (selectorString).indexOf (this) >= 0;
    }
    cloneNode (deep: boolean): RMLNode {
        const clone = this._uiscene.createElement (this.tagName);
        clone.classList._setValue (this.classList.value, false);
        clone._attributes = Object.assign ({}, this._attributes);
        if (deep) {
            for (let child = this.firstChild; child; child = child.nextSibling) {
                clone.appendChild (child.cloneNode (deep));
            }
        }
        return clone;
    }
    replaceWith (...nodes: (RMLNode|string)[]): void {
        for (const node of nodes) {
            this.before (...nodes);
        }
        this.remove ();
    }
    /** @internal */
    _updateStyle (val: string) {
        super._updateStyle (val);
        this._rawSetStyleAttribute (val);
    }
    /** @internal */
    _applyInlineStyles () {
        this.style.applyStyles (this.getAttribute('style')||'', true);
    }
     /** @internal */
     protected _getNumberAttribute (name: string, defaultValue: number): number {
        let val = this.getAttribute (name);
        const num = val === null ? defaultValue : Number(val);
        return Number.isNaN(num) ? defaultValue : num;
    }
    /** @internal */
    protected _setNumberAttribute (name: string, val: number) {
        this.setAttribute (name, String(val));
    }
    /** @internal */
    protected _getStringAttribute (name: string, defaultValue: string): string {
        const val = this.getAttribute (name);
        return val ? String(val) : defaultValue;
    }
    /** @internal */
    protected _setStringAttribute (name: string, val: string) {
        this.setAttribute (name, String(val));
    }
    /** @internal */
    _rawSetStyleAttribute (style: string) {
        style = style || '';
        if (this._attributes['style'] !== style) {
            this._attributes['style'] = style;
            this._dispatchEvent (AttributeChangeEvent.NAME, new AttributeChangeEvent(this, 'style', false), false);
        }
    }
    /** @internal */
    _setTagName (name: string) {
        this._tagname = name;
    }
    remove (): RMLNode {
        this._remove ();
        return this;
    }
    before (...nodes: (RMLNode|string)[]): void {
        this._before (...nodes);
    }
    after (...nodes: (RMLNode|string)[]): void {
        this._after (...nodes);
    }
    append (...nodes: (RMLNode|string)[]): void {
        this._append (...nodes);
    }
    prepend (...nodes: (RMLNode|string)[]): void {
        this._prepend (...nodes);
    }
    querySelectorAll (selectors: string): RMLNodeList {
        return new RMLStaticNodeList(this._uiscene._querySelectorAll (this, selectors, true, false));
    }
    querySelector (selectors: string): RMLElement {
        return this._uiscene._querySelectorOne (this, selectors, true, false);
    }
    getElementById (id: string): RMLElement {
        for (let child = this.firstElementChild; child; child = child.nextElementSibling) {
            const el = this._uiscene._getElementById (child, id);
            if (el) {
                return el;
            }
        }
        return null;
    }
    getElementsByTagName (tagname: string): RMLNodeList {
        const results: RMLElement[] = [];
        for (let child = this.firstElementChild; child; child = child.nextElementSibling) {
            this._uiscene._getElementsByTagName (child, tagname, results);
        }
        return new RMLStaticNodeList(results);
    }
    getElementsByClassName (classnames: string): RMLNodeList {
        const results: RMLElement[] = [];
        classnames = classnames || '';
        const classNameList = classnames.split (/\s+/).filter(val => !!val);
        if (classNameList.length > 0) {
            for (let child = this.firstElementChild; child; child = child.nextElementSibling) {
                this._uiscene._getElementsByClassName (child, classNameList, results);
            }
        }
        return new RMLStaticNodeList(results);
    }
}