import * as Yoga from './typeflex/api';
import { Renderer, Texture, Font, GlyphManager, IGlyphInfo, ImageManager, GUIHitTestVisitor, UILayout, UIRect, RMLNode, RMLElement, Input, RMLDocument, StyleElement, IStyleSheet, parseStyleSheet, Event, DOMTreeEvent, GUIMouseEvent, GUIKeyEvent, GUIFocusEvent, RMLSelector, Rule, Vec2, assert, EventTarget, eventtarget, RMLPrimitiveBatchList } from '.';
import { Visitor, visitor } from './misc';
import { FileLoader, LoadManager } from './asset';

interface IElementConstructor {
    new (gui: GUI, ...args: any[]): any;
}

interface ITagNameGetter {
    (element: RMLElement): string;
}

class GUIDrawVisitor extends Visitor {
    private _renderer: Renderer;
    constructor (renderer: Renderer) {
        super ();
        this._renderer = renderer;
    }
    @visitor(RMLNode)
    visitElement (w: RMLNode) {
        if (w._isVisible()) {
            w.draw (this._renderer);
        }
    }
}

export class ElementRegistry {
    private _constructors: { [tagname: string]: IElementConstructor };
    constructor () {
        this._constructors = {};
    }
    register (ctor: IElementConstructor, tagname: string|ITagNameGetter) {
        assert (!!ctor, 'Failed to register element type with null constructor', true);
        assert (!!tagname, 'Failed to register element type with null tag name getter', true);
        if (typeof tagname === 'string') {
            assert (!this._constructors[tagname], 'Failed to register element type: tagname already registered', true);
            this._constructors[tagname] = ctor;
        }
    }
    createElement (gui: GUI, tagname: string): RMLElement {
        let ctor = this._constructors[tagname] || this._constructors['div'];
        const el = new ctor (gui);
        el._setTagName (tagname);
        return el;
    }
}

const elementRegistry = new ElementRegistry ();

export function tagname (name: string) {
    return function (ctor: IElementConstructor) {
        elementRegistry.register (ctor, name);
    }
}

export interface GUI extends EventTarget {}

const deviceMouseEvents = [
    GUIMouseEvent.NAME_MOUSEDOWN,
    GUIMouseEvent.NAME_MOUSEUP,
    GUIMouseEvent.NAME_MOUSEMOVE, 
    GUIMouseEvent.NAME_MOUSECLICK, 
    GUIMouseEvent.NAME_MOUSEDBLCLICK
];

const deviceKeyEvents = [
    GUIKeyEvent.NAME_KEYDOWN,
    GUIKeyEvent.NAME_KEYUP,
    GUIKeyEvent.NAME_KEYPRESS
];

@eventtarget()
export class GUI {
    /** @internal */
    protected _renderer: Renderer;
    /** @internal */
    protected _imageManager: ImageManager;
    /** @internal */
    protected _glyphManager: GlyphManager;
    /** @internal */
    protected _document: RMLDocument;
    /** @internal */
    protected _focusElement: RMLNode;
    /** @internal */
    protected _captureElement: RMLNode;
    /** @internal */
    protected _layoutDirty: boolean;
    /** @internal */
    protected _updatingLayout: boolean;
    /** @internal */
    protected _topLayout: UILayout;
    /** @internal */
    protected _hoverElements: { element:RMLNode, x:number, y:number }[];
    /** @internal */
    protected _bounds: UIRect;
    /** @internal */
    protected _styleRefreshList: RMLNode[];
    /** @internal */
    protected _styleFullRefresh: boolean;
    /** @internal */
    protected _ruleListImported: { rule: Rule, stylesheet: IStyleSheet, extra: object }[];
    /** @internal */
    protected _guiLoading: boolean;
    /** @internal */
    protected _styleUpdating: boolean;
    /** @internal */
    protected _domTag: number;
    /** @internal */
    protected _baseURI: string;
    /** @internal */
    protected _drawVisitor: GUIDrawVisitor;

    constructor (renderer: Renderer, bounds?: UIRect) {
        this._renderer = renderer;
        this._drawVisitor = new GUIDrawVisitor (renderer);
        this._imageManager = new ImageManager (this._renderer);
        this._glyphManager = new GlyphManager (this._renderer);
        this._document = null;
        this._focusElement = null;
        this._captureElement = null;
        this._hoverElements = [];
        this._layoutDirty = false;
        this._updatingLayout = false;
        this._bounds = bounds ? {...bounds} : null;
        this._styleRefreshList = [];
        this._styleFullRefresh = false;
        this._ruleListImported = [];
        this._guiLoading = false;
        this._styleUpdating = false;
        this._domTag = 0;
        this._baseURI = '';
        this._topLayout = new UILayout (null);
        this._topLayout.node.setDisplay (Yoga.DISPLAY_FLEX);
        this._topLayout.node.setPadding (Yoga.EDGE_LEFT, 0);
        this._topLayout.node.setPadding (Yoga.EDGE_TOP, 0);
        this._topLayout.node.setPadding (Yoga.EDGE_RIGHT, 0);
        this._topLayout.node.setPadding (Yoga.EDGE_BOTTOM, 0);
        this._topLayout.node.setPositionType (Yoga.POSITION_TYPE_ABSOLUTE);
        this._topLayout.node.setPosition (Yoga.EDGE_LEFT, this._bounds ? this._bounds.x : 0);
        this._topLayout.node.setPosition (Yoga.EDGE_TOP, this._bounds ? this._bounds.y : 0);
        this._topLayout.node.setWidth (this._bounds ? this._bounds.width : this._renderer.getDrawingBufferWidth());
        this._topLayout.node.setHeight (this._bounds ? this._bounds.height : this._renderer.getDrawingBufferHeight());
        this.addEventListener ('deviceresize', function (this: GUI) {
            if (!this._bounds) {
                this._topLayout.node.setWidth (this._renderer.getDrawingBufferWidth());
                this._topLayout.node.setHeight (this._renderer.getDrawingBufferHeight());
                this.invalidateLayout ();
                setTimeout (() => {
                    const inputs = this.document.querySelectorAll ('input');
                    for (const input of inputs.values()) {
                        (input as unknown as Input)._updateHiddenInput ();
                    }
                }, 0);
            }
        });
        for (const evt of deviceMouseEvents) {
            this.addEventListener (evt, function (this: GUI, e: Event) {
                const mouseEvent: GUIMouseEvent = e as GUIMouseEvent;
                if (evt === GUIMouseEvent.NAME_MOUSEMOVE) {
                    let hits: { element:RMLNode, x:number, y:number }[] = null;
                    if (this._captureElement) {
                        const v = this._captureElement.toAbsolute ({ x:0, y:0 });
                        hits = [{ element: this._captureElement, x: mouseEvent.x - v.x, y: mouseEvent.y - v.y }];
                    } else {
                        hits = this.hitTest (mouseEvent.x, mouseEvent.y);
                    }
                    if (hits.length === 0) {
                        this._renderer.setCursorStyle ('default');
                    }
                    for (let i = 0; i < this._hoverElements.length; i++) {
                        const info = this._hoverElements[i];
                        if (!hits.find (hit => hit.element === info.element)) {
                            const p = info.element.toAbsolute ({ x:0, y:0 });
                            info.element._onMouseOut (mouseEvent.x - p.x, mouseEvent.y - p.y);
                            if (info.element.enabled) {
                                info.element.dispatchEvent (new GUIMouseEvent(GUIMouseEvent.NAME_MOUSEOUT, mouseEvent.x - p.x, mouseEvent.y - p.y, mouseEvent.button, mouseEvent.keymod));
                            }
                        }
                    }
                    for (let i = 0; i < hits.length; i++) {
                        const info = hits[i];
                        if (!this._hoverElements.find (hit => hit.element === info.element)) {
                            info.element._onMouseIn (info.x, info.y);
                            if (info.element.enabled) {
                                info.element.dispatchEvent (new GUIMouseEvent(GUIMouseEvent.NAME_MOUSEIN, info.x, info.y, mouseEvent.button, mouseEvent.keymod));
                            }
                        }
                    }
                    const lastHover = this._hoverElements.length > 0 ? this._hoverElements[0] : null;
                    const newHover = hits.length > 0 ? hits[0] : null;
                    if (lastHover?.element !== newHover?.element) {
                        if (lastHover) {
                            const p = lastHover.element.toAbsolute ({ x:0, y:0 });
                            lastHover.element._onMouseLeave (mouseEvent.x - p.x, mouseEvent.y - p.y);
                            if (lastHover.element.enabled) {
                                lastHover.element.dispatchEvent (new GUIMouseEvent(GUIMouseEvent.NAME_MOUSELEAVE, mouseEvent.x - p.x, mouseEvent.y - p.y, mouseEvent.button, mouseEvent.keymod));
                            }
                        }
                        if (newHover) {
                            newHover.element._onMouseEnter (newHover.x, newHover.y);
                            if (newHover.element.enabled) {
                                newHover.element.dispatchEvent (new GUIMouseEvent(GUIMouseEvent.NAME_MOUSEENTER, newHover.x, newHover.y, mouseEvent.button, mouseEvent.keymod));
                            }
                        }
                    }
                    this._hoverElements = hits;
                }
                if (this._hoverElements.length > 0) {
                    if (mouseEvent.button === 1) {
                        if (evt === GUIMouseEvent.NAME_MOUSEDOWN) {
                            this._hoverElements[0].element._onMouseDown (this._hoverElements[0].x, this._hoverElements[0].y);
                            this.setFocus (this._hoverElements[0].element.enabled ? this._hoverElements[0].element : null);
                        } else if (evt === GUIMouseEvent.NAME_MOUSEUP) {
                            this._hoverElements[0].element._onMouseUp (this._hoverElements[0].x, this._hoverElements[0].y);
                        }
                    }
                    for (const info of this._hoverElements) {
                        if (!info.element.enabled) {
                            continue;
                        }
                        const me = new GUIMouseEvent(evt, info.x, info.y, mouseEvent.button, mouseEvent.keymod);
                        info.element.dispatchEvent (me);
                        if (me.cancelBubble) {
                            break;
                        }
                    }
                }
            });
        }
        for (const evt of deviceKeyEvents) {
            this.addEventListener (evt, function (this: GUI, e: Event) {
                const keyEvent = e as GUIKeyEvent;
                if (this._focusElement && this._focusElement.enabled) {
                    let node = this._focusElement;
                    while (node) {
                        const ke = new GUIKeyEvent (evt, keyEvent.key, keyEvent.name, keyEvent.charCode, keyEvent.repeat, keyEvent.keymod);
                        node.dispatchEvent (ke);
                        if (ke.cancelBubble) {
                            break;
                        }
                        node = node.parentNode;
                    }
                }
            });
        }
        const domChangeFunc = function (this: GUI, e: Event) {
            const data: DOMTreeEvent = e as DOMTreeEvent;
            this._domTag++;
            if ((data.target as RMLNode).nodeType === RMLNode.ELEMENT_NODE) {
                const el: RMLElement = data.target as RMLElement;
                if (el.tagName === 'style' || el.querySelectorAll ('style')) {
                    this.requireFullStyleRefresh ();
                } else {
                    this._markStyleRefreshForElement (data.parent || el);
                }
                if (!this._guiLoading && (el.tagName === 'link' || el.querySelector ('link'))) {
                    let linkElements = el.tagName === 'link' ? [data.target] : [];
                    linkElements = [...linkElements, ...el.querySelectorAll ('link').values()];
                    for (const el of linkElements) {
                        this._importLinkContent (el as RMLElement);
                    }
                }
            }
        };
        this.addEventListener (DOMTreeEvent.NAME_INSERTED, domChangeFunc);
        this.addEventListener (DOMTreeEvent.NAME_REMOVED, domChangeFunc);
        this._document = new RMLDocument (this);
        this._topLayout.appendChild (this._document._getLayout());
        const root = this._document.createElement ('html');
        root.append (this._document.createElement('head'));
        root.append (this._document.createElement('body'));
        this._document.append (root);
        this.invalidateLayout ();
        this.requireFullStyleRefresh ();
    }
    get renderer () {
        return this._renderer;
    }
    get bounds (): UIRect {
        return this._bounds;
    }
    set bounds (rect: UIRect) {
        this._bounds = rect ? {...rect} : null;
        this._topLayout.node.setPosition (Yoga.EDGE_LEFT, this._bounds ? this._bounds.x : 0);
        this._topLayout.node.setPosition (Yoga.EDGE_TOP, this._bounds ? this._bounds.y : 0);
        this._topLayout.node.setWidth (this._bounds ? this._bounds.width : this._renderer.getDrawingBufferWidth());
        this._topLayout.node.setHeight (this._bounds ? this._bounds.height : this._renderer.getDrawingBufferHeight());
        this.invalidateLayout ();
    }
    get baseURI (): string {
        return this._baseURI;
    }
    set baseURI (val: string) {
        this._baseURI = val || '';
    }
    get document (): RMLDocument {
        return this._document;
    }
    get imageManager (): ImageManager {
        return this._imageManager;
    }
    getFocus () {
        return this._focusElement;
    }
    setFocus (node: RMLNode) {
        node = node || null;
        if (node !== this._focusElement) {
            if (this._focusElement) {
                const focusElement = this._focusElement;
                setTimeout (()=>{
                    focusElement.dispatchEvent (new GUIFocusEvent(GUIFocusEvent.NAME_BLUR));
                }, 0);
            }
            if (node) {
                setTimeout (()=>{
                    node.dispatchEvent (new GUIFocusEvent(GUIFocusEvent.NAME_FOCUS));
                }, 0);
            }
            this._focusElement = node;
            this.dispatchEvent (new DOMTreeEvent (DOMTreeEvent.NAME_FOCUSED, null));
        }
    }
    getCapture () {
        return this._captureElement;
    }
    setCapture (node: RMLNode) {
        this._captureElement = node || null;
    }
    dispose () {
        this._imageManager?.dispose ();
        this._imageManager = null;
    }
    invalidateLayout () {
        this._layoutDirty = true;
    }
    requireFullStyleRefresh () {
        if (!this._styleUpdating) {
            this._styleFullRefresh = true;
        }
    }
    /** @internal */
    get domTag (): number {
        return this._domTag;
    }
    checkAndRefreshStyle () {
        if (this._document) {
            if (this._styleFullRefresh) {
                this._styleRefreshList.splice (0, this._styleRefreshList.length, this._document);
            } else {
                // skip removed elements and style elements
                const validElements: RMLNode[] = [];
                for (const e of this._styleRefreshList) {
                    if (e.nodeType === RMLNode.ELEMENT_NODE && (e as RMLElement).tagName !== 'style' && e._isSucceedingOf (this._document)) {
                        validElements.push (e);
                    }
                }
                this._styleRefreshList = validElements;
            }
            if (this._styleRefreshList.length > 0) {
                this._styleUpdating = true;
                const styleElements = this._document.querySelectorAll ('style');
                const processedElements: Set<RMLNode> = new Set();
                const ruleList: { rule: Rule, stylesheet: IStyleSheet, extra: object }[] = [...this._ruleListImported];
                for (const el of styleElements.values()) {
                    for (const def of (el as StyleElement).definitions) {
                        for (const rule of def.selector.rules()) {
                            ruleList.push ({ rule: rule, stylesheet: def.stylesheet, extra: def.extra });
                        }
                    }
                }
                let allElements: RMLElement[] = null;
                let pseudoMap: Map<RMLNode, Map<string, { stylesheet:IStyleSheet, extra:object }[]> > = new Map();
                if (this._styleFullRefresh) {
                    allElements = this._querySelectorAll (this._document, '*', true, true);
                }
                if (ruleList.length > 0) {
                    if (this._styleRefreshList.indexOf (this._document) >= 0) {
                        this._styleRefreshList.splice (0, this._styleRefreshList.length, this._document);
                    }
                    ruleList.sort ((a, b) => { return a.rule.specificity - b.rule.specificity });
                    for (const rule of ruleList) {
                        rule.rule.resolve (this._styleRefreshList, true, true, (node: RMLNode, type: string) => {
                            const pseudoTypes: Map<string, { stylesheet:IStyleSheet, extra:object }[]> = pseudoMap.get (node) || new Map();
                            pseudoMap.set (node, pseudoTypes);
                            const styleList: { stylesheet:IStyleSheet, extra:object }[] = pseudoTypes.get (type) || [];
                            pseudoTypes.set (type, styleList);
                            styleList.push ({ stylesheet: rule.stylesheet, extra: rule.extra });
                        });
                        for (const e of rule.rule.targets) {
                            if (e.nodeType !== RMLNode.DOCUMENT_NODE) {
                                if (!processedElements.has (e)) {
                                    e._resetStyle ();
                                    processedElements.add (e);
                                }
                                e.style.applyStyleSheet (rule.stylesheet, false);
                            }
                            e._updatePseudoElementStyles (pseudoMap.get(e));
                        }
                        if (!this._styleFullRefresh) {
                            for (const e of pseudoMap) {
                                e[0]._updatePseudoElementStyles (e[1]);
                            }
                            pseudoMap.clear ();
                        }
                    }
                    processedElements.forEach (e => {
                        e._applyInlineStyles ();
                    });
                }
                if (this._styleFullRefresh) {
                    for (const e of allElements) {
                        if (!processedElements.has (e)) {
                            e._resetStyle ();
                            e._applyInlineStyles ();
                        }
                        e._updatePseudoElementStyles (pseudoMap.get (e));
                    }
                } else {
                    for (const e of this._styleRefreshList) {
                        if (!processedElements.has (e)) {
                            e._resetStyle ();
                            e._applyInlineStyles ();
                        }
                    }
                }
                this._styleUpdating = false;
            }
        }
        this._styleRefreshList.splice (0, this._styleRefreshList.length);
        this._styleFullRefresh = false;
    }
    updateLayout () {
        if (this._layoutDirty) {
            if (this._updatingLayout) {
                console.warn ('updateLayout called recursively');
            } else {
                this._layoutDirty = false;
                this._updatingLayout = true;
                this._topLayout.calcLayout ();
                if (this._document) {
                    this._document._syncLayout ();
                }
                this._updatingLayout = false;
            }
        }
    }
    hitTest (x: number, y: number): { element:RMLNode, x:number, y:number }[] {
        if (this._document) {
            this.updateLayout ();
            const v = new GUIHitTestVisitor (x, y);
            this._document.traverse (v, true, true);
            let hits = v.getHits ();
            if (hits.length > 0) {
                const topmost = hits[0].element;
                hits = hits.filter (val => val.element.contains (topmost));
            }
            return hits;
        } else {
            return [];
        }
    }
    render () {
        this.checkAndRefreshStyle ();
        this.updateLayout ();
        this._renderer.beginRender ();
        this.document.traverse (this._drawVisitor);
        this._renderer.endRender ();
    }
    serializeToXML (): string {
        return this._serializeToXML ();
    }
    async deserializeFromXML (xml: string) {
        this._guiLoading = true;
        while (this._document.firstChild) {
            this._document.removeChild (this._document.firstChild);
        }
        const parser = new DOMParser ();
        const dom = parser.parseFromString (xml, 'text/html');
        if (dom.getElementsByTagName ('parsererror').length > 0) {
            return null;
        }
        const docElement = dom.documentElement;
        this._document.append (this._deserializeElement (docElement));
        const linkElements = this._document.querySelectorAll ('link');
        const promises: Promise<any>[] = [];
        for (const link of linkElements.values()) {
            promises.push (this._importLinkContent (link as RMLElement));
        }
        await Promise.all (promises);
        this._guiLoading = false;
    }
    async deserializeFromURL (url: string) {
        this._guiLoading = true;
        const content = await new FileLoader (null, 'text').load (url) as string;
        if (content) {
            const normalizedURL = LoadManager.resolveURL (url);
            const index = normalizedURL.lastIndexOf ('/');
            this._baseURI = normalizedURL.substring (0, index + 1);
            await this.deserializeFromXML (content);
        }
        this._guiLoading = false;
    }
    createElement<T extends RMLElement = RMLElement>(tagname: string): T {
        const el = elementRegistry.createElement (this, tagname) as T;
        el._init ();
        return el;
    }
    /** @internal */
    _drawBatchList (batches: RMLPrimitiveBatchList) {
        for (let i = 0; i < batches.length; i++) {
            const batch = batches.getBatch (i);
            const vertices = batches.getVertices (i);
            const color = batch.color;
            if (color.w > 0 && vertices) {
                this._renderer.drawQuads (vertices, batch.texture || null);
            }
        }
    }
    /** @internal */
    _getGlyphTexture (index: number): Texture {
        return this._glyphManager.getGlyphTexture(index);
    }
    /** @internal */
    _getGlyphInfo (char: string, font: Font): IGlyphInfo {
        return this._glyphManager.getGlyphInfo (char, font);
    }
    /** @internal */
    _measureStringWidth (str: string, charMargin: number, font: Font) {
        return this._glyphManager.measureStringWidth (str, charMargin, font);
    }
    /** @internal */
    _clipStringToWidth (str: string, width: number, charMargin: number, start: number, font: Font) {
        return this._glyphManager.clipStringToWidth (str, width, charMargin, start, font);
    }
    /** @internal */
    _querySelectorAll (root: RMLNode, selectors: string, excludeRoot: boolean, allowInternal: boolean): RMLElement[] {
        return new RMLSelector(selectors).resolve (root, excludeRoot, allowInternal) as RMLElement[];
    }
    /** @internal */
    _querySelectorOne (root: RMLNode, selectors: string, excludeRoot: boolean, allowInternal): RMLElement {
        return this._querySelectorAll (root, selectors, excludeRoot, allowInternal)[0] || null;
    }
    /** @internal */
    _getTopLayout (): UILayout {
        return this._topLayout;
    }
    /** @internal */
    _getElementById (root: RMLNode, id: string): RMLElement {
        if (root.nodeType === RMLNode.ELEMENT_NODE && (root as RMLElement).id === id) {
            return root as RMLElement;
        }
        for (const child of root.childNodes.values()) {
            const e = this._getElementById (child, id);
            if (e) {
                return e;
            }
        }
        return null;
    }
    /** @internal */
    _getElementsByTagName (root: RMLNode, tagname: string, results: RMLElement[]) {
        if (root.nodeType === RMLNode.ELEMENT_NODE && (root as RMLElement).tagName === tagname) {
            results.push (root as RMLElement);
        }
        for (const child of root.childNodes.values()) {
            this._getElementsByTagName (child, tagname, results);
        }
        return null;
    }
    /** @internal */
    _getElementsByClassName (root: RMLNode, classnames: string[], results: RMLElement[]) {
        if (root.nodeType === RMLNode.ELEMENT_NODE) {
            let matched = true;
            const el = root as RMLElement;
            for (const classname of classnames) {
                if (!el.classList.contains (classname)) {
                    matched = false;
                    break;
                }
            }
            if (matched) {
                results.push (el);
            }
        }
        for (const child of root.childNodes.values()) {
            this._getElementsByClassName (child, classnames, results);
        }
        return null;
    }
    /** @internal */
    _markStyleRefreshForElement (element: RMLNode) {
        if (!this._styleUpdating && element && this._styleRefreshList.indexOf(element) < 0) {
            this._styleRefreshList.push (element);
        }
    }
    /** @internal */
    async _importRuleListFromURL (url: string) {
        const content = await new FileLoader (null, 'text').load (this._baseURI + url) as string;
        if (content) {
            const entries = this._parseStyleContent (content);
            for (const def of entries) {
                for (const rule of def.selector.rules()) {
                    this._ruleListImported.push ({ rule: rule, stylesheet: def.stylesheet, extra: def.extra });
                }
            }
        }
    }
    /** @internal */
    _parseStyleContent (content: string): { selector: RMLSelector, stylesheet: IStyleSheet, extra: object }[] {
        const result: { selector: RMLSelector, stylesheet: IStyleSheet, extra: object }[] = [];
        content = content.split (/[\r\n]+/).join ('').replace (/\/\*[\s\S]*?\*\//g, '');
        while (true) {
            const lbracket = content.indexOf ('{');
            const rbracket = content.indexOf ('}');
            if (lbracket < 0 || rbracket < 0 || lbracket > rbracket) {
                break;
            }
            const sel = content.substring (0, lbracket).trim ();
            const styles = content.substring (lbracket + 1, rbracket);
            content = content.substr (rbracket + 1);

            const selector = new RMLSelector (sel);
            if (selector.rules().length === 0) {
                continue;
            }
            const extra: object = {};
            const stylesheet = parseStyleSheet (styles, extra);
            if (!stylesheet) {
                continue;
            }
            result.push ({ selector, stylesheet, extra });
        }
        return result;
    }
    /** @internal */
    private _deserializeElement (el: Element): RMLElement {
        const element = this.createElement (el.tagName.toLowerCase());
        for (const attr of el.attributes) {
            element.setAttribute (attr.name, attr.value);
        }
        for (const className of el.classList) {
            element.classList.add (className);
        }
        for (const child of el.childNodes) {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent.trim().replace (/\s+/, ' ');
                if (text !== '') {
                    element.append (text);
                }
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                element.append (this._deserializeElement (child as Element));
            }
        }
        return element;
    }
    /** @internal */
    private async _importLinkContent (link: RMLElement) {
        switch (link.getAttribute ('rel')) {
            case 'stylesheet': {
                await this._importRuleListFromURL (link.getAttribute ('href'))
                    .then (() => this.requireFullStyleRefresh ())
                    .catch (reason => console.error (reason));
                break;
            }
        }
    }
    /** @internal */
    private _serializeToXML (): string {
        const doc = document.implementation.createDocument (null, 'node', null);
        doc.firstChild.remove ();
        if (this.document.documentElement) {
            doc.append (this._createDOMElement (this.document.documentElement, doc, null));
            this._buildDOM (this.document.documentElement, doc, doc.documentElement);
        }
        return new XMLSerializer().serializeToString (doc);
    }
    /** @internal */
    private _buildDOM (root: RMLNode, doc: Document, parent: Element|Document) {
        for (const child of root.childNodes.values()) {
            if (!child._isInternal()) {
                const childElement = this._createDOMElement (child, doc, null);
                parent.append (childElement);
                if (childElement instanceof Element) {
                    this._buildDOM (child, doc, childElement);
                }
            }
        }
    }
    /** @internal */
    private _createDOMElement (el: RMLNode, doc: Document, out: Element|Node): Element|Node {
        if (el._isText()) {
            out = doc.createTextNode (el.textContent);
        } else if (el.nodeType === RMLNode.ELEMENT_NODE) {
            out = out || doc.createElement ((el as RMLElement).tagName);
            if ((el as RMLElement).className) {
                (out as Element).className = (el as RMLElement).className;
            }
            for (const k of (el as RMLElement).attributes) {
                (out as Element).setAttribute (k.name, k.value);
            }
        }
        return out;
    }
}