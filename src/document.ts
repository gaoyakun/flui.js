import { RMLNode, RMLElement, GUI, IStyleSheet, RMLNodeList, RMLStaticNodeList } from '.';

export class RMLDocument extends RMLNode<RMLDocument> {
    private _textContent: string;
    constructor (uiscene: GUI) {
        super (uiscene);
        this._textContent = '';
    }
    get nodeType (): number {
        return RMLNode.DOCUMENT_NODE;
    }
    get nodeName (): string {
        return '#document';
    }
    get head (): RMLElement {
        return this.querySelector ('head');
    }
    get body (): RMLElement {
        return this.querySelector ('body');
    }
    get baseURI (): string {
        return this._uiscene.baseURI;;
    }
    set baseURI (val: string) {
        this._uiscene.baseURI = val;
    }
    get textContent (): string {
        return this._textContent;
    }
    set textContent (val: string) {
        this._textContent = val;
    }
    get documentElement (): RMLElement {
        return this.firstElementChild || null;
    }
    get children (): RMLNodeList {
        return this._childrenElements;
    }
    get childElementCount (): number {
        return this._childrenElements.length;
    }
    get firstElementChild (): RMLElement {
        return this._getFirstChild (true) as RMLElement;
    }
    get lastElementChild (): RMLElement {
        return this._getLastChild (true) as RMLElement;
    }
    appendChild (child: RMLNode): RMLNode {
        if (child.nodeType !== RMLNode.ELEMENT_NODE) {
            throw new Error ('Failed to execute appendChild: only element can be inserted into document');
        } else if (this.childElementCount > 0) {
            throw new Error ('Failed to execute appendChild: only one element can be inserted into document');
        }
        return super.appendChild (child);
    }
    insertBefore (newElement: RMLNode, referenceElement: RMLNode) {
        if (!newElement || newElement.nodeType !== RMLNode.ELEMENT_NODE) {
            throw new Error ('Failed to execute insertBefore: only element can be inserted into document');
        } else if (referenceElement || this.childElementCount > 0) {
            throw new Error ('Failed to execute insertBefore: only one element can be inserted into document');
        }
        return super.appendChild (newElement);
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
    getElementById (id: string): RMLElement {
        return this._uiscene._getElementById (this, id);
    }
    createElement<T extends RMLElement = RMLElement>(tagname: string): T {
        return this._uiscene.createElement<T> (tagname);
    }
    /** @internal */
    _getDefaultStyleSheet (): IStyleSheet {
        return { 
            position: 'absolute',
            flexDirection: 'column',
            left: '0px',
            top: '0px',
            right: '0px',
            bottom: '0px',
            overflow: 'auto',
            backgroundColor: 'rgba(0,0,0,0)'
        };
    }
}