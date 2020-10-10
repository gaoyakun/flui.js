import { RMLRectPrimitive, RMLNode, GUI, IStyleSheet, UIRect, TextEvent, AttributeChangeEvent, assert, Vec2, Event } from '..';

export class Text<U extends Text<any> = Text<any> > extends RMLNode<U> {
    private _actualContent: string;
    private _textContent: string;
    private _autoWrap: boolean;
    private _charMargin: number;
    private _lineHeight: number;
    private _inlineStyle: string;
    constructor (uiscene: GUI) {
        super (uiscene);
        this._actualContent = '';
        this._textContent = '';
        this._autoWrap = false;
        this._charMargin = 0;
        this._lineHeight = -1;
        this._inlineStyle = '';
        this.addEventListener (AttributeChangeEvent.NAME, function (this: Text<U>, evt: Event) {
            const e: AttributeChangeEvent = evt as AttributeChangeEvent;
            if (e.name === 'autoWrap' || e.name === 'charMargin' || e.name === 'lineHeight') {
                this._invalidateLayout ();
                this._invalidateContent ();
            }
        });
    }
    get nodeType (): number {
        return RMLNode.TEXT_NODE;
    }
    cloneNode (deep: boolean): RMLNode {
        const clone = new Text (this._uiscene);
        clone.textContent = this.textContent;
        return clone;
    }
    /** @internal */
    get actualContent (): string {
        return this._actualContent;
    }
    /** @internal */
    set actualContent (text: string) {
        text = String(text) || '';
        if (this._actualContent !== text) {
            this._actualContent = text;
            this._invalidateLayout ();
            this._invalidateContent ();
            this.dispatchEvent (new TextEvent(TextEvent.NAME_CONTENT_CHANGE));
        }
    }
    get textContent (): string {
        return this._textContent;
    }
    set textContent (text: string) {
        text = String(text) || '';
        if (this._textContent !== text) {
            this._textContent = text;
            if (this._isText()) {
                this._findFirstTextNode ()._styleChange ();
            } else {
                this.actualContent = text;
            }
            if (this._parent) {
                this._parent._notifyTextContentEvents ();
            }
        }
    }
    get autoWrap (): boolean {
        return this._autoWrap;
    }
    set autoWrap (val: boolean) {
        this._autoWrap = !!val;
    }
    get charMargin (): number {
        return this._charMargin;
    }
    set charMargin (val: number) {
        this._charMargin = Number(val);
    }
    // FIXME: lineHeight is style
    get lineHeight (): number {
        return this._lineHeight;
    }
    set lineHeight (val: number) {
        this._lineHeight = val <= 0 ? -1 : val;
    }
    /** @internal */
    _updateStyle (val: string) {
        super._updateStyle (val);
        this._inlineStyle = val;
    }
    /** @internal */
    _applyInlineStyles () {
        this.style.applyStyles (this._inlineStyle, true);
    }
    /** @internal */
    _getDefaultStyleSheet (): IStyleSheet {
        const style = super._getDefaultStyleSheet ();
        style.backgroundColor = 'transparent';
        style.flex = '0 0 auto';
        style.display = this._findFirstTextNode() === this ? 'flex' : 'none';
        return style;
    }
    /** @internal */
    measureTextLocation (px: number, py: number): { line: number, pos: number } {
        const lines = this._splitContent ();
        const font = this._getCachedFont();
        const lineHeight = (this.lineHeight >= 0 ? this.lineHeight : -this.lineHeight * font.maxHeight)|0;
        const charMargin = this.charMargin;
        const l = Math.floor((py - this.style.getPaddingTop()) / lineHeight);
        if (l < 0 || l >= lines.length) {
            return null;
        }
        let t = this.style.getPaddingLeft();
        let c = 0;
        for (let i = 0; i < l; i++) {
            c += lines[i].length;
        }
        for (let i = 0; i < lines[l].length; i++) {
            const glyph = this._uiscene._getGlyphInfo (lines[l][i], font);
            if (glyph) {
                if (px <= t + (glyph.width >> 1)) {
                    break;
                }
                t += glyph.width + charMargin;
                c++;
            }
        }
        return { line: l, pos: c };
    }
    /** @internal */
    _measureContentSize (rc: UIRect): UIRect {
        const lines = this._splitContent ();
        const font = this._getCachedFont();
        const lineHeight = (this.lineHeight >= 0 ? this.lineHeight : -this.lineHeight * font.maxHeight)|0;
        const charMargin = this.charMargin;
        const autoWrap = this.autoWrap;
        if (rc.width === 0 && rc.height === 0) {
            for (const line of lines) {
                rc.width = Math.max (rc.width, this._uiscene._measureStringWidth(line, charMargin, font));
                rc.height += lineHeight;
            }
        } else if (rc.height === 0) {
            for (const line of lines) {
                let start = 0;
                if (line.length === 0) {
                    rc.height += lineHeight;
                } else {
                    while (start < line.length) {
                        start += autoWrap ? Math.max(1, this._uiscene._clipStringToWidth (line, rc.width, charMargin, start, font)) : line.length;
                        rc.height += lineHeight;
                    }
                }
            }
        } else if (rc.width === 0) {
            for (const line of lines) {
                rc.width = Math.max (rc.width, this._uiscene._measureStringWidth(line, charMargin, font));
            }
        }
        return rc;
    }
    /** @internal */
    _isText (): boolean {
        return true;
    }
    /** @internal */
    _normalize (): RMLNode {
        assert (!this.previousSibling || !this.previousSibling._isText(), 'Failed to execute _normalize: text node must be the first', true);
        this._textContent = this._actualContent;
        const textSiblings: RMLNode[] = [];
        let next = this.nextSibling;
        while (next && next._isText()) {
            textSiblings.push (next);
            next = next.nextSibling;
        }
        for (const sibling of textSiblings) {
            this.parentNode.removeChild (sibling);
        }
        if (!this._textContent) {
            this._remove ();
        }
        return next;
    }
    /** @internal */
    _remove (): RMLNode {
        const parent = this._parent;
        if (this._isText()) {
            const first = this._findFirstTextNode ();
            const next = this.nextSibling;
            const nextTextNode: Text = next && next._isText() ? next as Text : null;
            super._remove ();
            if (first !== this) {
                first._styleChange ();
            } else if (nextTextNode) {
                nextTextNode._styleChange ();
            }
        } else {
            super._remove ();
        }
        if (parent) {
            parent._notifyTextContentEvents ();
        }
        return this;
    }
    /** @internal */
    _init (): void {
    }
    /** @internal */
    _reparent (p: RMLNode, at?: RMLNode): RMLNode {
        if (this._parent !== p) {
            super._reparent (p, at);
            if (this._isText() && this._getPseudo() === RMLNode.PSEUDO_NONE) {
                const first = this._findFirstTextNode ();
                first._styleChange ();
                if (first !== this) {
                    this.style.display = 'none';
                }
                const next = this.nextSibling;
                if (next && next._isText() && next._getPseudo() === RMLNode.PSEUDO_NONE) {
                    next.style.display = 'none';
                }
            }
            if (this._parent) {
                this._parent._notifyTextContentEvents ();
            }
        }
        return this;
    }
    /** @internal */
    protected _buildVertexData () {
        super._buildVertexData ();
        const clipper = this._getClipper (true);
        if (clipper) {
            const lines = this._splitContent ();
            const font = this._getCachedFont ();
            const lineHeight = (this.lineHeight >= 0 ? this.lineHeight : -this.lineHeight * font.maxHeight)|0;
            const autoWrap = this.autoWrap;
            const charMargin = this.charMargin;
            const fontColor = this._getCachedFontColor ();
            const uvMin = { x:0, y:0 };
            const uvMax = { x:0, y:0 };
            let y = this.style.getPaddingTop();
            for (const line of lines) {
                let start = 0;
                if (line.length === 0) {
                    y += lineHeight;
                } else {
                    while (start < line.length) {
                        let x = this.style.getPaddingLeft();
                        const n = autoWrap ? Math.max(1, this._uiscene._clipStringToWidth (line, this._layout.clientRect.width, charMargin, start, font)) : line.length;
                        for (let i = start; i < start + n; i++) {
                            const glyph = this._uiscene._getGlyphInfo (line[i], font);
                            if (glyph) {
                                const tex = this._uiscene._getGlyphTexture (glyph.atlasIndex);
                                uvMin.x = glyph.uMin;
                                uvMin.y = glyph.vMin;
                                uvMax.x = glyph.uMax;
                                uvMax.y = glyph.vMax;
                                this._batchList.addPrimitive (new RMLRectPrimitive(x, y, glyph.width, glyph.height, uvMin.x, uvMin.y, uvMax.x, uvMax.y), clipper, tex, fontColor);
                                x += glyph.width + charMargin;
                            }
                        }
                        start += n;
                        y += lineHeight;
                    }
                }
            }
        }
    }
    /** @internal */
    private _splitContent (): string[] {
        const content = this.actualContent || '';
        const tab2space = Array.from({length:4}).map(()=>' ').join('');
        return content.replace (/\t/g, tab2space).split('\n');
    }
    /** @internal */
    private _findFirstTextNode (): Text {
        let el: RMLNode = this;
        while (el.previousSibling?._isText() && el.previousSibling?._getPseudo() === RMLNode.PSEUDO_NONE) {
            el = el.previousSibling;
        }
        return el as Text;
    }
    /** @internal */
    private _styleChange () {
        assert (!this.previousSibling || !this.previousSibling._isText(), 'Failed to execute _updateStyle: text node must be the first', true);
        this.style.display = 'flex';
        let content = this.textContent;
        for (let next = this.nextSibling; next && next._isText() && next._getPseudo() === RMLNode.PSEUDO_NONE; next = next.nextSibling) {
            content += next.textContent;
        }
        this.actualContent = content;
    }
}
