import { Vec2, Vec4, Texture, EventTarget, eventtarget, RMLRectPrimitive, RMLPolygonPrimitive, unescapeCSSString, RMLPrimitiveBatchList, RMLElement, RMLDocument, RMLNodeList, RMLLiveNodeList, GUIRenderer, TextureAtlas, GUI, UIRect, UILayout, ElementStyle, IStyleSheet, ValueChangeEvent, ElementLayoutEvent, GUIEvent, DOMTreeEvent, ElementBuildContentEvent, TextContentChangeEvent, Text } from '.';

export interface RMLNode<U = RMLNode<any> > extends EventTarget {}

const defaultCursor = 'default';
const tmpUV1 = { x:0, y:0 };
const tmpUV2 = { x:0, y:0 };

@eventtarget()
export class RMLNode<U extends RMLNode<any> = RMLNode<any> > {
    protected static readonly PSEUDO_NONE = 0;
    protected static readonly PSEUDO_BEFORE = 1;
    protected static readonly PSEUDO_AFTER = 2;
    static readonly UNKNOWN_NODE = 0;
    static readonly ELEMENT_NODE = 1;
    static readonly TEXT_NODE = 3;
    static readonly DOCUMENT_NODE = 9;
    private static _defaultFont: Font = null;
    private static _defaultFontSize = '12px';
    private static _defaultFontFamily = 'arial';
    /** @internal */
    protected _uiscene: GUI;
    /** @internal */
    protected _parent: RMLNode;
    /** @internal */
    protected _childNodes: RMLNode[];
    /** @internal */
    protected _children: RMLNodeList;
    /** @internal */
    protected _childrenElements: RMLNodeList;
    /** @internal */
    protected _renderOrder: number[];
    /** @internal */
    protected _renderOrderChanged: boolean;
    /** @internal */
    protected _hScroll: RMLNode;
    /** @internal */
    protected _vScroll: RMLNode;
    /** @internal */
    protected _layout: UILayout;
    /** @internal */
    protected _layoutChangeStamp: number;
    /** @internal */
    protected _disableCounter: number;
    /** @internal */
    protected _mouseIn: boolean;
    /** @internal */
    protected _mouseDown: boolean;
    /** @internal */
    protected _state: number;
    /** @internal */
    protected _batchList: RMLPrimitiveBatchList;
    /** @internal */
    protected _numQuads: number;
    /** @internal */
    protected _contentDirty: boolean;
    /** @internal */
    protected _loadingTextures: Texture[];
    /** @internal */
    protected _backgroundColor: Vec4;
    /** @internal */
    protected _backgroundImage: TextureAtlas;
    /** @internal */
    protected _borderLeftColor: Vec4;
    /** @internal */
    protected _borderTopColor: Vec4;
    /** @internal */
    protected _borderRightColor: Vec4;
    /** @internal */
    protected _borderBottomColor: Vec4;
    /** @internal */
    protected _style: ElementStyle;
    /** @internal */
    protected _hide: boolean;
    /** @internal */
    protected _internal: boolean;
    /** @internal */
    protected _pseudo: number;
    /** @internal */
    protected _font: Font;
    /** @internal */
    protected _cachedFontSize: string;
    /** @internal */
    protected _cachedFontFamily: string;
    /** @internal */
    protected _fontColor: Vec4;
    /** @internal */
    constructor (uiscene: GUI) {
        this._uiscene = uiscene;
        this._parent = null;
        this._childNodes = [];
        this._children = new RMLLiveNodeList(this, RMLLiveNodeList.MODE_NON_INTERNAL);
        this._childrenElements = new RMLLiveNodeList(this, RMLLiveNodeList.MODE_ELEMENT_NON_INTERNAL);
        this._renderOrder = [];
        this._renderOrderChanged = false;
        this._hScroll = null;
        this._vScroll = null;
        this._loadingTextures = [];
        this._backgroundColor = ElementStyle.defaultBackgroundColor;
        this._backgroundImage = null;
        this._borderLeftColor = ElementStyle.defaultBorderColor;
        this._borderTopColor = ElementStyle.defaultBorderColor;
        this._borderRightColor = ElementStyle.defaultBorderColor;
        this._borderBottomColor = ElementStyle.defaultBorderColor;
        this._layout = new UILayout(this);
        this._style = new ElementStyle(this._layout);
        this._layoutChangeStamp = -1;
        this._disableCounter = 0;
        this._batchList = new RMLPrimitiveBatchList(0, 0);
        this._numQuads = 0;
        this._contentDirty = true;
        this._hide = false;
        this._internal = false;
        this._pseudo = RMLNode.PSEUDO_NONE;
        this._font = null;
        this._cachedFontSize = null;
        this._cachedFontFamily = null;
        this._fontColor = null;
        this._resetStyle ();
    }
    get gui (): GUI {
        return this._uiscene;
    }
    get nodeType (): number {
        return RMLNode.UNKNOWN_NODE;
    }
    get nodeName (): string {
        switch (this.nodeType) {
            case RMLNode.ELEMENT_NODE:
                return (this as unknown as RMLElement).tagName;
            case RMLNode.TEXT_NODE:
                return '#text';
            case RMLNode.DOCUMENT_NODE:
                return '#document';
            default:
                return '#unknown';
        }
    }
    get nodeValue (): string {
        switch (this.nodeType) {
            case RMLNode.TEXT_NODE:
                return this.textContent;
            default:
                return null;
        }
    }
    get ownerDocument (): RMLDocument {
        return this === this._uiscene.document as RMLNode<any> ? null : this._uiscene.document || null;
    }
    get isConnected (): boolean {
        return this._isSucceedingOf (this._uiscene.document);
    }
    get parentNode (): RMLNode {
        return this._parent;
    }
    get parentElement (): RMLElement {
        return this._parent && this._parent.nodeType === RMLNode.ELEMENT_NODE ? this._parent as unknown as RMLElement : null;
    }
    get childNodes (): RMLNodeList {
        return this._children;
    }
    get style (): ElementStyle {
        return this._style;
    }
    get textContent (): string {
        let content = '';
        for (let child = this.firstChild; child; child = child.nextSibling) {
            content += child.textContent;
        }
        return content;
    }
    set textContent (text: string) {
        text = String(text) || '';
        text = text.trim().replace (/\s+/, ' ');
        const childrenToBeRemoved: RMLNode[] = [];
        for (let child = this.firstChild; child; child = child.nextSibling) {
            if (!child._isInternal()) {
                childrenToBeRemoved.push (child);
            }
        }
        for (const child of childrenToBeRemoved) {
            child._remove ();
        }
        if (this._pseudo === RMLNode.PSEUDO_BEFORE || this._pseudo === RMLNode.PSEUDO_AFTER || text !== '') {
            this._append (text);
        }
    }
    normalize () {
        let finished = false;
        let child = this.firstChild;
        while (!finished) {
            finished = true;
            for (; child; child = child.nextSibling) {
                if (child._isText()) {
                    child = (child as Text)._normalize ();
                    finished = false;
                    break;
                }
            }
        }
        for (child = this.firstChild; child; child = child.nextSibling) {
            child.normalize ();
        }
    }
    get scrollX (): number {
        return this._layout.desiredScrollX;
    }
    set scrollX (val: number) {
        this.setScrollX (val);
    }
    setScrollX (val: number) {
        if (this._layout.desiredScrollX !== val) {
            this._layout.desiredScrollX = val;
            this._syncLayout ();
        }
    }
    get scrollY (): number {
        return this._layout.desiredScrollY;
    }
    set scrollY (val: number) {
        this.setScrollY (val);
    }
    setScrollY (val: number) {
        if (this._layout.desiredScrollY !== val) {
            this._layout.desiredScrollY = val;
            this._syncLayout ();
        }
    }
    setScroll (x: number, y: number) {
        if (this._layout.desiredScrollX !== x || this._layout.desiredScrollY !== y) {
            this._layout.desiredScrollX = x;
            this._layout.desiredScrollY = y;
            this._syncLayout ();
        }
    }
    getRect (): UIRect {
        this._uiscene.updateLayout ();
        return this._layout.actualRect;
    }
    getClippedRect (): UIRect {
        this._uiscene.updateLayout ();
        return this._layout.clippedRect;
    }
    getClientRect (): UIRect {
        this._uiscene.updateLayout ();
        return this._layout.clientRect;
    }
    getBorderRect (): UIRect {
        this._uiscene.updateLayout ();
        return this._layout.borderRect;
    }
    enable () {
        const parentCounter = this._parent ? this._parent._disableCounter : 0;
        if (this._disableCounter > parentCounter) {
            this._disable (-1);
            this._updateState ();
        }
    }
    disable () {
        const parentCounter = this._parent ? this._parent._disableCounter : 0;
        if (this._disableCounter === parentCounter) {
            this._disable (1);
            this._updateState ();
        }
    }
    get enabled (): boolean {
        return this._disableCounter === 0;
    }
    set enabled (enable: boolean) {
        enable ? this.enable () : this.disable ();
    }
    get nextSibling (): RMLNode {
        return this._getNextSibling (false);
        // return this._layout.nextSibling()?.element || null;
    }
    get previousSibling (): RMLNode {
        return this._getPreviousSibling (false);
        // return this._layout.previousSibling()?.element || null;
    }
    /** @internal */
    protected _remove (): RMLNode {
        let parent: RMLNode = null;
        if (this._parent) {
            parent = this._parent;
            const index = this._parent._childNodes.indexOf (this);
            assert (index >= 0, 'remove: node is not child', true);
            const focus = this._uiscene.getFocus ();
            if (focus && focus._isSucceedingOf (this)) {
                this._uiscene.setFocus (null);
            }
            const captured = this._uiscene.getCapture ();
            if (captured && captured._isSucceedingOf (this)) {
                this._uiscene.setCapture (null);
            }
            this._parent._removeChild (index);
            this._parent = null;
            this._disable (-this._disableCounter);
        } else {
            return null;
        }
        this._dispatchEvent (DOMTreeEvent.NAME_REMOVED, new DOMTreeEvent(this, parent), true);
        return this;
    }
    /** @internal */
    protected _before (...nodes: (RMLNode|string)[]): void {
        assert (!!this.parentNode, 'Failed to execute before: parent element must not be null', true);
        assert (nodes.indexOf(this) < 0, 'Failed to execute before: cannot insert self node', true);
        let first: RMLNode = this;
        for (let i = nodes.length-1; i >= 0; i--) {
            const node = nodes[i];
            if (typeof node === 'string') {
                const textNode = new Text (this._uiscene);
                textNode.textContent = node;
                textNode.style.width = 'auto';
                textNode.style.height = 'auto';
                textNode.style.flex = '0 0 auto';
                textNode.style.cursor = 'auto';
                this.parentNode.insertBefore (textNode, first);
                first = textNode;
            } else if (node instanceof RMLNode) {
                this.parentNode.insertBefore (node, first);
                first = node;
            }
        }
    }
    /** @internal */
    protected _after (...nodes: (RMLNode|string)[]): void {
        assert (!!this.parentNode, 'Failed to execute after: parent element must not be null', true);
        assert (nodes.indexOf(this) < 0, 'Failed to execute after: cannot insert self node', true);
        let next: RMLNode = this.nextSibling;
        if (next) {
            next._before (...nodes);
        } else {
            this.parentNode._append (...nodes);
        }
    }
    /** @internal */
    protected _append (...nodes: (RMLNode|string)[]): void {
        for (const node of nodes) {
            if (typeof node === 'string') {
                const textNode = new Text (this._uiscene);
                textNode.textContent = node;
                textNode.style.width = 'auto';
                textNode.style.height = 'auto';
                textNode.style.flex = '0 0 auto';
                textNode.style.cursor = 'auto';
                textNode.style.backgroundColor = 'rgba(0,0,0,0)';
                this.appendChild (textNode);
            } else if (node instanceof RMLNode) {
                this.appendChild (node);
            }
        }
    }
    /** @internal */
    protected _prepend (...nodes: (RMLNode|string)[]): void {
        let first = this.firstChild;
        if (!first) {
            this._append (...nodes);
        } else {
            first._before (...nodes);
        }
    }
    cloneNode (deep: boolean): RMLNode {
        throw new Error ('Failed to call cloneNode');
    }
    getRootNode (): RMLNode {
        let root: RMLNode = this;
        while (root.parentNode) {
            root = root.parentNode;
        }
        return root;
    }
    appendChild (child: RMLNode): RMLNode {
        assert (!!child, `Failed to appendChild: element to be append is ${child}`, true);
        assert (!this._isSucceedingOf(child), `Failed to appendChild: cannot append parent element`, true);
        const ref = this.lastChild?._layout.nextSibling()?.element;
        child._reparent (this, ref);
        return child;
    }
    insertBefore (newElement: RMLNode, referenceElement: RMLNode) {
        assert (referenceElement && this === referenceElement.parentNode, 'Failed to insertBefore: reference element is not a valid elememnt or is not a child of this node', true);
        assert (!!newElement, `Failed to insertBefore: element to be insert is ${newElement}`, true);
        assert (!this._isSucceedingOf(newElement), `Failed to insertBefore: cannot insert parent element`, true);
        newElement._reparent (this, referenceElement);
        return newElement;
    }
    removeChild (child: RMLNode) {
        assert (!!child, `Failed to removeChild: element to be remove is ${child}`, true);
        assert (this === child.parentNode, 'Failed to removeChild: element to be remove is not a child of this node', true);
        return child._remove ();
    }
    replaceChild (newChild: RMLNode, oldChild: RMLNode) {
        assert (!!newChild, `Failed to replaceChild: element to be insert is ${newChild}`, true);
        assert (!!oldChild, `Failed to replaceChild: element to be replaced is ${oldChild}`, true);
        assert (this === oldChild.parentNode, 'Failed to replaceChild: element to be replaced is not a child of this node', true);
        if (newChild !== oldChild) {
            const next = oldChild.nextSibling;
            this.removeChild (oldChild);
            if (next) {
                this.insertBefore (newChild, next);
            } else {
                this.appendChild (newChild);
            }
        }
        return oldChild;
    }
    get firstChild (): RMLNode {
        return this._getFirstChild (false);
    }
    get lastChild (): RMLNode {
        return this._getLastChild (false);
    }
    contains (child: RMLNode): boolean {
        return child && child._isSucceedingOf (this);
    }
    hasChildNodes (): boolean {
        return this.childNodes.length > 0;
    }
    setCapture () {
        if (this._isSucceedingOf (this._uiscene.document)) {
            this._uiscene.setCapture (this);
        }
    }
    releaseCapture () {
        if (this._uiscene.getCapture() === this) {
            this._uiscene.setCapture (null);
        }
    }
    accept (v: Visitor) {
        v.visit (this);
    }
    traverse (v: Visitor, inverse?: boolean, render?: boolean) {
        if (!this._isVisible()) {
            return;
        }
        if (!!render) {
            if (this._renderOrderChanged) {
                this._renderOrderChanged = false;
                this._updateRenderOrders ();
            }
            if (!!inverse) {
                for (let i = this._renderOrder.length-1; i >= 0; i--) {
                    this._childNodes[this._renderOrder[i]].traverse (v, inverse, render);
                }
                v.visit (this);
            } else {
                v.visit (this);
                for (let i = 0; i < this._renderOrder.length; i++) {
                    this._childNodes[this._renderOrder[i]].traverse (v, inverse, render);
                }
            }
        } else {
            if (!!inverse) {
                for (let i = this._childNodes.length-1; i >= 0; i--) {
                    this._childNodes[i].traverse (v, inverse, render);
                }
                v.visit (this);
            } else {
                v.visit (this);
                for (const child of this._childNodes) {
                    child.traverse (v, inverse, render);
                }
            }
        }
    }
    draw (renderer: GUIRenderer) {
        const img = this.style.backgroundImage ? this._uiscene.imageManager.getImage (this.style.backgroundImage) : null;
        if (img !== this._backgroundImage) {
            this._backgroundImage = img;
            this._contentDirty = true;
        }
        if (this._contentDirty) {
            this._contentDirty = false;
            this._batchList.clear ();
            const w = this._layout.actualRect.width;
            const h = this._layout.actualRect.height;
            if (w > 0 && h > 0) {
                const v = this.toAbsolute ({ x:0, y:0 });
                this._batchList.x = v.x;
                this._batchList.y = v.y;
                const preEvt = new ElementBuildContentEvent (this, this._batchList);
                this.dispatch (ElementBuildContentEvent.NAME_PREBUILD, this, preEvt);
                if (preEvt.default) {
                    this._buildVertexData ();
                    const postEvt = new ElementBuildContentEvent (this, this._batchList);
                    this.dispatch (ElementBuildContentEvent.NAME_POSTBUILD, this, postEvt);
                }
            }
        }
        this._draw (renderer);
    }
    toAbsolute (v: Vector2): Vector2 {
        return this._layout.toAbsolute (v);
    }
    /** @internal */
    _getCachedFontSize (): string {
        return this._cachedFontSize || this.parentNode?._getCachedFontSize() || RMLNode._defaultFontSize;
    }
    /** @internal */
    _getCachedFontFamily (): string {
        return this._cachedFontFamily || this.parentNode?._getCachedFontFamily() || RMLNode._defaultFontFamily;
    }
    /** @internal */
    _getCachedFont (): Font {
        if (!this._font) {
            this._font = new Font (`${this._getCachedFontSize()} ${this._getCachedFontFamily()}`);
        }
        return this._font;
    }
    /** @internal */
    _getCachedFontColor (): Vector4 {
        return this._fontColor || this.parentNode?._getCachedFontColor() || ElementStyle.defaultFontColor;
    }
    /** @internal */
    _updatePseudoElementStyles (types: Map<string, { stylesheet: IStyleSheet, extra: any }[]>) {
        for (const name of ['before', 'after']) {
            const info = types?.get (name);
            let pseudo: number;
            let node: RMLNode;
            if (name === 'before') {
                pseudo = RMLNode.PSEUDO_BEFORE;
                node = this._childNodes.length > 0 && this._childNodes[0]._getPseudo() === pseudo ? this._childNodes[0] : null;
            } else {
                pseudo = RMLNode.PSEUDO_AFTER;
                node = this._childNodes.length > 0 && this._childNodes[this._childNodes.length-1]._getPseudo() === pseudo ? this._childNodes[this._childNodes.length-1] : null;
            }
            if (info) {
                if (!node) {
                    node = this.ownerDocument.createElement ('div');
                    node._setInternal ();
                    node._setPseudo (pseudo);
                    node._reparent (this, name === 'before' && this._childNodes.length > 0 ? this._childNodes[0] : null);
                } else {
                    node._resetStyle ();
                }
                for (const s of info) {
                    node.style.applyStyleSheet (s.stylesheet, true);
                }
                if (info.length > 0 && typeof info[info.length-1].extra.content === 'string' ) {
                    const s = info[info.length-1].extra.content.trim();
                    let match = s.match (/^'([^']*)'$/);
                    if (!match) {
                        match = s.match (/^"([^"]*)"$/);
                    }
                    if (match) {
                        node.textContent = unescapeCSSString(match[1]);
                    }
                }
            } else if (node) {
                node._remove ();
            }
        }
    }
    /** @internal */
    _updateStyle (val: string) {
        this._uiscene._markStyleRefreshForElement (this);
    }
    /** @internal */
    _updateBorder () {
        this._invalidateContent ();
    }
    /** @internal */
    _updateZIndex () {
        if (this._parent) {
            this._parent._markRenderOrderChanged ();
        }
        return this;
    }
    /** @internal */
    _updateCursor (val: string): void {

    }
    /** @internal */
    _updateDisplay (val: string): void {
        this._hide = val === 'none';
    }
    /** @internal */
    _updateBorderLeftColor (val: Vector4): void {
        this._borderLeftColor.assign (val);
        this._invalidateContent ();
    }
    /** @internal */
    _updateBorderTopColor (val: Vector4): void {
        this._borderTopColor.assign (val);
        this._invalidateContent ();
    }
    /** @internal */
    _updateBorderRightColor (val: Vector4): void {
        this._borderRightColor.assign (val);
        this._invalidateContent ();
    }
    /** @internal */
    _updateBorderBottomColor (val: Vector4): void {
        this._borderBottomColor.assign (val);
        this._invalidateContent ();
    }
    /** @internal */
    _updateBackgroundColor (val: Vector4): void {
        this._backgroundColor.assign (val);
        this._invalidateContent ();
    }
    /** @internal */
    _updateFont (val: string): void {
        if (this.style.font === val) {
            this._font = val ? new Font (val) : null;
        }
        this._invalidateContent ();
        this._invalidateLayout ();
        for (const child of this._childNodes) {
            child._updateFont (val);
        }
    }
    /** @internal */
    _updateFontSize (val: string): void {
        val = val || null;
        if (this._cachedFontSize !== val) {
            this._cachedFontSize = val;
            this._font = null;
            this._invalidateContent ();
            this._invalidateLayout ();
            for (const child of this._childNodes) {
                child._invalidateFont (true, false);
            }
        }
    }
    /** @internal */
    _updateFontFamily (val: string): void {
        val = val || null;
        if (this._cachedFontFamily !== val) {
            this._cachedFontFamily = val;
            this._font = null;
            this._invalidateContent ();
            this._invalidateLayout ();
            for (const child of this._childNodes) {
                child._invalidateFont (false, true);
            }
        }
    }
    /** @internal */
    _updateFontColor (val: string): void {
        if (this.style.color === val) {
            this._fontColor = val ? this.style.parseColor (val) : null;
        }
        this._invalidateContent ();
        for (const child of this._childNodes) {
            child._updateFontColor (val);
        }
    }
    /** @internal */
    _isSucceedingOf (w: RMLNode): boolean {
        let p: RMLNode = this;
        while (p && p !== w) {
            p = p.parentNode;
        }
        return !!p;
    }
    /** @internal */
    _isValid (): boolean {
        return this._uiscene && this._isSucceedingOf (this._uiscene.document);
    }
    /** @internal */
    _invalidateLayout () {
        if (this._isSucceedingOf (this._uiscene.document)) {
            this._layout.markDirty ();
            this._uiscene.invalidateLayout ();
        }
    }
    /** @internal */
    _invalidateContent () {
        this._contentDirty = true;
    }
    /** @internal */
    _invalidateFont (sizeChange:boolean, familyChange:boolean) {
        if ((sizeChange && this._cachedFontSize === null) || (familyChange && this._cachedFontFamily === null)) {
            this._font = null;
            this._invalidateContent ();
            for (const child of this._childNodes) {
                child._invalidateFont (sizeChange, familyChange);
            }
        }
    }
    /** @internal */
    _reparent (p: RMLNode, at?: RMLNode): RMLNode {
        if (this._parent !== p) {
            this._remove ();
            this._parent = p;
            if (p) {
                p._insertChild (this, at ? p._childNodes.indexOf (at) : -1);
                this._disable (p._disableCounter);
                this._dispatchEvent (DOMTreeEvent.NAME_INSERTED, new DOMTreeEvent(this, p), true);
            }
        }
        return this;
    }
    /** @internal */
    _calcLayout () {
        this._layout.calcLayout ();
        this._syncLayout ();
    }
    /** @internal */
    _getClipper (clipToClient: boolean): UIRect {
        const clipper: UIRect = this._layout.clippedRect || (clipToClient ? this._layout.clientRect : {
            x: 0,
            y: 0,
            width: this._layout.actualRect.width,
            height: this._layout.actualRect.height
        });
        return clipper.width > 0 && clipper.height > 0 ? clipper : null;
    }
    /** @internal */
    _measureContentSize (rc: UIRect): UIRect {
        rc.width = 0;
        rc.height = 0;
        return rc;
    }
    /** @internal */
    _onMouseIn (x: number, y: number) {
        this._mouseIn = true;
        this._updateState ();
    }
    /** @internal */
    _onMouseOut (x: number, y: number) {
        this._mouseIn = false;
        this._updateState ();
    }
    /** @internal */
    _onMouseEnter (x: number, y: number) {
        const cvs = this._uiscene.viewer.canvas;
        if (cvs instanceof HTMLCanvasElement) {
            const cursor = this.style.cursor || defaultCursor;
            if (cursor !== 'auto') {
                cvs.style.cursor = cursor;
            }
        }
    }
    /** @internal */
    _onMouseLeave (x: number, y: number) {
    }
    /** @internal */
    _onMouseDown (x: number, y: number) {
        this._mouseDown = true;
        this._updateState ();
    }
    /** @internal */
    _onMouseUp (x: number, y: number) {
        this._mouseDown = false;
        this._updateState ();
    }
    /** @internal */
    _getDefaultStyleSheet (): IStyleSheet {
        const style = {} as IStyleSheet;
        style.flex = '0 1 auto';
        style.flexDirection = 'row';
        style.width = 'auto';
        style.height = 'auto';
        return style;
    }
    /** @internal */
    _resetStyle () {
        this._font = null;
        this._fontColor = null;
        this.style.reset ();
        this.style.applyStyleSheet (this._getDefaultStyleSheet(), false);
    }
    /** @internal */
    _applyInlineStyles () {
    }
    /** @internal */
    _isVisible (): boolean {
        return !this._hide && (!this._parent || this._parent._isVisible());
    }
    /** @internal */
    _getLayout (): UILayout {
        return this._layout;
    }
    /** @internal */
    _syncLayout () {
        this._layout.calcLayoutScroll ();
        this._layout.calcLayoutClip ();
        this._notifyLayoutEvents ();
    }
    /** @internal */
    protected _updateState () {
        if (this._pseudo === RMLNode.PSEUDO_NONE) {
            this._uiscene._markStyleRefreshForElement (this);
        }
    }
    /** @internal */
    protected _draw (renderer: GUIRenderer) {
        if (this._batchList.length > 0) {
            renderer.drawBatchList (this._batchList);
        }
    }
    /** @internal */
    protected _buildVertexData () {
        const w = this._layout.actualRect.width;
        const h = this._layout.actualRect.height;
        const img = this._backgroundImage;
        let drawPatch9: boolean = !!(img?.topLeftPatch9 && img?.bottomRightPatch9);
        if (drawPatch9) {
            if (img.topLeftPatch9.x + img.bottomRightPatch9.x > this._layout.actualRect.height
                || img.topLeftPatch9.y + img.bottomRightPatch9.y > this._layout.actualRect.width) {
                drawPatch9 = false;
            }
        }
        const color = this._backgroundColor;
        const clipper = this._getClipper (false);
        if (clipper) {
            if (color.w > 0) {
                if (!drawPatch9) {
                    const u1 = img?.uvMin.x || 0;
                    const v1 = img?.uvMin.y || 0;
                    const u2 = img?.uvMax.x || 0;
                    const v2 = img?.uvMax.y || 0;
                    this._batchList.addPrimitive (new RMLRectPrimitive(0, 0, w, h, u1, v1, u2, v2), clipper, this._backgroundImage?.texture || null, color);
                } else {
                    let t = img.topLeftPatch9.x;
                    let l = img.topLeftPatch9.y;
                    let b = img.bottomRightPatch9.x;
                    let r = img.bottomRightPatch9.y;
                    const u1 = img.uvMin.x;
                    const v1 = img.uvMin.y;
                    const u2 = img.uvMax.x;
                    const v2 = img.uvMax.y;
                    const aw = (img.texture.width * (u2 - u1) + 0.5) | 0;
                    const ah = (img.texture.height * (v2 - v1) + 0.5) | 0;
                    const ul = u1 + (u2 - u1) * l;
                    const ur = u1 + (u2 - u1) * r;
                    const vt = v1 + (v2 - v1) * t;
                    const vb = v1 + (v2 - v1) * b;
                    t = (t * ah) | 0;
                    l = (l * aw) | 0;
                    b = ah - ((b * ah) | 0);
                    r = aw - ((r * aw) | 0);
                    const quads = [
                        (t === 0 || l === 0) ? null : [0, 0, l, t, u1, v1, ul, vt],
                        (t === 0) ? null : [t, 0, w - l - r, t, ul, v1, ur, vt],
                        (t === 0 || r === 0) ? null : [w - r, 0, r, t, ur, v1, u2, vt],
                        (t + b === h) ? null : [0, t, l, h - t - b, u1, vt, ul, vb],
                        (t + b === h) ? null : [l, t, w - l - r, h - t - b, ul, vt, ur, vb],
                        (t + b === h) ? null : [w - r, t, r, h - t - b, ur, vt, u2, vb],
                        (b === 0 || l === 0) ? null : [0, h - b, l, b, u1, vb, ul, v2],
                        (b === 0) ? null : [l, h - b, w - l - r, b, ul, vb, ur, v2],
                        (b === 0 || r === 0) ? null : [w - r, h - b, r, b, ur, vb, u2, v2]
                    ];
                    for (const q of quads) {
                        if (q) {
                            tmpUV1.x = q[4];
                            tmpUV1.y = q[5];
                            tmpUV2.x = q[6];
                            tmpUV2.y = q[7];
                            this._batchList.addPrimitive (new RMLRectPrimitive(q[0],q[1],q[2],q[3],q[4],q[5],q[6],q[7]), clipper, this._backgroundImage?.texture || null, color);
                        }
                    }
                }
            }

            const borderLeft = this.style.borderLeftWidth ? parseInt(this.style.borderLeftWidth as string) : 0;
            const borderTop = this.style.borderTopWidth ? parseInt(this.style.borderTopWidth as string): 0;
            const borderRight = this.style.borderRightWidth ? parseInt(this.style.borderRightWidth as string): 0;
            const borderBottom = this.style.borderBottomWidth ? parseInt(this.style.borderBottomWidth as string): 0;
            const borderColorLeft = this._borderLeftColor;
            const borderColorTop = this._borderTopColor;
            const borderColorRight = this._borderRightColor;
            const borderColorBottom = this._borderBottomColor;
            if (borderLeft && borderColorLeft.w > 0) {
                this._batchList.addPrimitive (new RMLPolygonPrimitive([
                    {x:0,y:0},
                    {x:borderLeft,y:borderTop},
                    {x:borderLeft,y:h-borderBottom},
                    {x:0,y:h}]), clipper, null, borderColorLeft);
            }
            if (borderTop && borderColorTop.w > 0) {
                this._batchList.addPrimitive (new RMLPolygonPrimitive([
                    {x:0,y:0},
                    {x:w,y:0},
                    {x:w-borderRight,y:borderTop},
                    {x:borderLeft,y:borderTop}
                ]), clipper, null, borderColorTop);
            }
            if (borderRight && borderColorRight.w > 0) {
                this._batchList.addPrimitive (new RMLPolygonPrimitive([
                    {x:w-borderRight,y:borderTop},
                    {x:w,y:0},
                    {x:w,y:h},
                    {x:w-borderRight,y:h-borderBottom}
                ]), clipper, null, borderColorRight);
            }
            if (borderBottom && borderColorBottom.w > 0) {
                this._batchList.addPrimitive (new RMLPolygonPrimitive([
                    {x:0,y:h},
                    {x:borderLeft,y:h-borderBottom},
                    {x:w-borderRight,y:h-borderBottom},
                    {x:w,y:h}
                ]), clipper, null, borderColorBottom);
            }
        }
    }
    /** @internal */
    _isText (): boolean {
        return false;
    }
    /** @internal */
    _isInternal (): boolean {
        return this._internal;
    }
    /** @internal */
    _setInternal (): void {
        this._internal = true;
    }
    /** @internal */
    _getPseudo (): number {
        return this._pseudo;
    }
    /** @internal */
    _setPseudo (val: number) {
        this._pseudo = val;
    }
    /** @internal */
    _isHover (): boolean {
        return this._mouseIn;
    }
    /** @internal */
    _isActive (): boolean {
        return this._mouseDown;
    }
    /** @internal */
    _disable (count: number) {
        this._disableCounter += count;
        for (const child of this._childNodes) {
            child._disable (count);
        }
    }
    /** @internal */
    _markRenderOrderChanged () {
        this._renderOrderChanged = true;
    }
    /** @internal */
    _updateRenderOrders () {
        this._renderOrder = this._childNodes.map ((val, index) => index);
        // do stable sort
        this._renderOrder.sort ((a, b) => (this._childNodes[a]._getZIndex() - this._childNodes[b]._getZIndex()) || a - b);
    }
    /** @internal */
    _notifyLayoutEvents () {
        if (this._layout.changeStamp !== this._layoutChangeStamp) {
            this._layoutChangeStamp = this._layout.changeStamp;
            this._invalidateContent ();
            this._dispatchEvent (ElementLayoutEvent.NAME, new ElementLayoutEvent(this), false);
        }
        this._updateScrollState ();
        for (const child of this._childNodes) {
            child._notifyLayoutEvents ();
        }
    }
    /** @internal */
    _notifyTextContentEvents (e?: TextContentChangeEvent) {
        e = e || new TextContentChangeEvent (this);
        this._dispatchEvent (TextContentChangeEvent.NAME, e, true);
    }
    /** @internal */
    _dispatchEvent (name: string, e: GUIEvent, propagate: boolean) {
        this.dispatch (name, this, e);
        if (propagate) {
            let p = this._parent;
            while (p && e.propagate) {
                p.dispatch (name, p, e);
                p = p.parentNode;
            }
            if (e.propagate) {
                this._uiscene.dispatch (name, this._uiscene, e);
            }
        }
    }
    /** @internal */
    _getZIndex (): number {
        let val = Number(this.style.zIndex);
        if (Number.isNaN (val)) {
            val = 0;
        }
        return val;
    }
    /** @internal */
    _removeChild (index: number) {
        const child = this._childNodes[index];
        this._layout.removeChild (this._childNodes[index]._getLayout());
        this._childNodes.splice (index, 1);
        this._invalidateLayout ();
        this._markRenderOrderChanged ();
    }
    /** @internal */
    _insertChild (child: RMLNode, index: number = -1) {
        if (index >= 0) {
            let p = this._childNodes[index];
            this._layout.insertChild (child._getLayout(), p._getLayout());
            this._childNodes.splice (index, 0, child);
            if (child.nodeType === RMLNode.ELEMENT_NODE) {
                for (; p; p = p.nextSibling) {
                    if (p.nodeType === RMLNode.ELEMENT_NODE) {
                        break;
                    }
                }
            }
        } else {
            this._layout.appendChild (child._getLayout());
            this._childNodes.push (child);
        }
        this._invalidateLayout ();
        this._markRenderOrderChanged ();
    }
    /** @internal */
    _getChildren (): RMLNode[] {
        return this._childNodes;
    }
    /** @internal */
    protected _getFirstChild (element: boolean): RMLNode {
        for (let child = this._layout.firstChild()?.element; child; child = child._layout.nextSibling()?.element) {
            if (!child._isInternal() && (!element || child.nodeType === RMLNode.ELEMENT_NODE)) {
                return child;
            }
        }
        return null;
    }
    /** @internal */
    _getLastChild (element: boolean): RMLNode {
        for (let child = this._layout.lastChild()?.element; child; child = child._layout.previousSibling()?.element) {
            if (!child._isInternal() && (!element || child.nodeType === RMLNode.ELEMENT_NODE)) {
                return child;
            }
        }
        return null;
    }
    /** @internal */
    _getNextSibling (element: boolean): RMLNode {
        let result: RMLNode = this;
        do {
            result = result._layout.nextSibling()?.element || null;
        } while (result && (result._isInternal() || (!!element && result.nodeType !== RMLNode.ELEMENT_NODE)));
        return result;
    }
    /** @internal */
    _getPreviousSibling (element: boolean): RMLNode {
        let result: RMLNode = this;
        do {
            result = result._layout.previousSibling()?.element || null;
        } while (result && (result._isInternal() || (!!element && result.nodeType !== RMLNode.ELEMENT_NODE)));
        return result;
    }
    /** @internal */
    _init (): void {
    }
    protected _updateScrollState (): void {
        const overflowX = this.style.overflowX || 'auto';
        const overflowY = this.style.overflowY || 'auto';
        let xOverflow = overflowX === 'scroll' || (overflowX === 'auto' && this._layout.scrollRect !== null && this._layout.scrollRect.width > this._layout.actualRect.width);
        let yOverflow = overflowY === 'scroll' || (overflowY === 'auto' && this._layout.scrollRect !== null && this._layout.scrollRect.height > this._layout.actualRect.height);
        const scrollBarSize = 12;
        const blockSize = 8;
        const buttonSize = 12;
        if (xOverflow) {
            const width = yOverflow ? this._layout.clientRect.width - scrollBarSize : this._layout.clientRect.width;
            if (this._layout.clientRect.height < scrollBarSize || width < 2 * buttonSize + blockSize) {
                xOverflow = false;
            } else {
                if (!this._hScroll) {
                    this._hScroll = this._uiscene.createElement('scrollbar');
                    this._hScroll.style.position = 'fixed';
                    this._hScroll.style.zIndex = 999999;
                    this._hScroll.style.height = scrollBarSize;
                    (this._hScroll as any).setAttribute ('orientation', 'horizonal');
                    (this._hScroll as any).setAttribute ('blockSize', String(blockSize));
                    (this._hScroll as any).setAttribute ('buttonSize', String(buttonSize));
                    this._hScroll._setInternal ();
                    this._hScroll.on (ValueChangeEvent.NAME, null, (eventName: string, data: ValueChangeEvent) => {
                        this.scrollX = data.value;
                    });
                    this.appendChild (this._hScroll);                                
                }
                (this._hScroll as any).setAttribute ('rangeStart', String(this._layout.minScrollX));
                (this._hScroll as any).setAttribute ('rangeEnd', String(this._layout.maxScrollX));
                (this._hScroll as any).setAttribute ('value', String(this.scrollX));
                this._hScroll.style.left = this._layout.clientRect.x - this._layout.borderRect.x;
                this._hScroll.style.width = width;
                this._hScroll.style.bottom = this._layout.borderRect.height - this._layout.clientRect.height - this._layout.clientRect.y + this._layout.borderRect.y;
            }
        } 
        if (!xOverflow && this._hScroll) {
            this.removeChild (this._hScroll);
            this._hScroll = null;
        }
        if (yOverflow) {
            const height = xOverflow ? this._layout.clientRect.height - scrollBarSize : this._layout.clientRect.height;
            if (this._layout.clientRect.width < scrollBarSize || height < 2 * buttonSize + blockSize) {
                yOverflow = false;
            } else {
                if (!this._vScroll) {
                    this._vScroll = this._uiscene.createElement('scrollbar');
                    this._vScroll.style.position = 'fixed';
                    this._vScroll.style.zIndex = 999999;
                    this._vScroll.style.width = scrollBarSize;
                    (this._vScroll as any).setAttribute ('orientation', 'vertical');
                    (this._vScroll as any).setAttribute('blockSize', String(blockSize));
                    (this._vScroll as any).setAttribute('buttonSize', String(buttonSize));
                    this._vScroll._setInternal ();
                    this._vScroll.on (ValueChangeEvent.NAME, null, (eventName: string, data: ValueChangeEvent) => {
                        this.scrollY = data.value;
                    });
                    this.appendChild (this._vScroll);            
                }
                (this._vScroll as any).setAttribute('rangeStart', String(this._layout.minScrollY));
                (this._vScroll as any).setAttribute('rangeEnd', String(this._layout.maxScrollY));
                (this._vScroll as any).setAttribute('value', String(this.scrollY));
                this._vScroll.style.top = this._layout.clientRect.y - this._layout.borderRect.y;
                this._vScroll.style.height = height;
                this._vScroll.style.right = this._layout.borderRect.width - this._layout.clientRect.width - this._layout.clientRect.x + this._layout.borderRect.x;
            }
        } 
        if (!yOverflow && this._vScroll) {
            this.removeChild (this._vScroll);
            this._vScroll = null;
        }
    }
}