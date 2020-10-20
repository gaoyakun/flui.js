import { assert, RMLRectPrimitive, RMLPrimitiveBatchList, Text, GUI, tagname, Event, ElementLayoutEvent, GUIMouseEvent, RMLElement, IStyleSheet, GUIFocusEvent, TextEvent, Renderer } from '..';

@tagname ('input')
export class Input extends RMLElement<Input> {
    private _hiddenInput: HTMLInputElement;
    private _selectionStart: number;
    private _selectionEnd: number;
    private _drawCursor: boolean;
    private _cursorTimer: number;
    private _cursorBatch: RMLPrimitiveBatchList;
    private _text: Text;
    constructor (uiscene: GUI) {
        super (uiscene);
        this._selectionStart = 0;
        this._selectionEnd = 0;
        this._drawCursor = false;
        this._cursorTimer = null;
        this._cursorBatch = null;
        this._text = new Text (this._uiscene);
        this._text._setInternal ();
        this._text.style.backgroundColor = 'transparent';
        this._text.style.flex = '1 0 auto';
        this.appendChild (this._text);
        this._hiddenInput = document.createElement ('input');
        this._hiddenInput.type = 'text';
        this._hiddenInput.style.position = 'absolute';
        this._hiddenInput.style.boxSizing = 'border-box';
        this._hiddenInput.style.opacity = '0';
        this._hiddenInput.style.outline = 'none';
        this._hiddenInput.style.pointerEvents = 'none';
        this._hiddenInput.style.zIndex = '0';
        this._hiddenInput.style.transform = 'scaleY(0)';
        this._hiddenInput.style.transformOrigin = 'top';
        this._updateHiddenInput ();
        this._setHiddenInputSelection (this._selectionStart, this._selectionEnd);
        this._updateCursorVertices ();
        document.body.appendChild (this._hiddenInput);
        this.addEventListener (ElementLayoutEvent.NAME, function (this: Input) {
            this._updateHiddenInput ();
        });
        this.addEventListener (GUIFocusEvent.NAME_FOCUS, function (this: Input) {
            if (this.type === 'text') {
                this._hiddenInput.focus ();
                this._restartCursorTimer ();
            }
        });
        this.addEventListener (GUIFocusEvent.NAME_BLUR, function (this: Input) {
            if (this.type === 'text') {
                this._hiddenInput.blur ();
                this._stopCursorTimer ();
                this._drawCursor = false;
            }
        });
        this.addEventListener (GUIMouseEvent.NAME_MOUSEDOWN, function (this: Input, e: Event) {
            const data = e as GUIMouseEvent;
            if (data.button === 1) {
                if (this.type === 'text') {
                    this._hiddenInput.focus ();
                    const loc = this._text.measureTextLocation (data.x - this.getClientRect().x - this._text.getRect().x, data.y - this.getClientRect().y - this._text.getRect().y);
                    if (loc) {
                        assert (loc.line === 0);
                        this._selectionStart = loc.pos;
                        this._selectionEnd = loc.pos;
                        this._updateCursorVertices ();
                        this._setHiddenInputCaretPosition (loc.pos);
                    }
                } else if (this.type === 'color') {
                    const evt = new MouseEvent ('click', {
                        bubbles: true,
                        cancelable: true,
                        view: window
                    });
                    this._hiddenInput.dispatchEvent (evt);
                }
            }
        });
        this.addEventListener (TextEvent.NAME_CONTENT_CHANGE, function (this: Input, e: Event) {
            const data = e as TextEvent;
            if (this._hiddenInput.value !== this.textContent && this.type === 'text') {
                this._hiddenInput.value = this.textContent;
                this._selectionStart = Math.min (this._selectionStart, this.textContent.length);
                this._selectionEnd = Math.max (this._selectionStart, Math.min (this._selectionEnd, this.textContent.length));
                this._setHiddenInputSelection (this._selectionStart, this._selectionEnd);
                this._updateCursorVertices ();
            }
        });
        this.addEventListener (TextEvent.NAME_FONT_CHANGE, function (this: Input) {
            that._updateHiddenInput ();
        });
        const that = this;
        this._hiddenInput.addEventListener ('keydown', function() {
            if (this.type === 'text') {
                setTimeout (function() {
                    const lastSelection = that._selectionStart;
                    that._selectionStart = that._hiddenInput.selectionStart;
                    that._selectionEnd = that._hiddenInput.selectionEnd;
                    if (that._selectionStart !== lastSelection) {
                        that._updateCursorVertices ();
                        that._drawCursor = true;
                    }
                }, 0);
            }
        });
        this._hiddenInput.addEventListener ('input', function () {
            that._oninput ();
        });
        // this._restartCursorTimer ();
    }
    private _oninput () {
        if (this.type === 'text') {
            this._text.textContent = this._hiddenInput.value;
            this._selectionStart = this._hiddenInput.selectionStart;
            this._selectionEnd = this._hiddenInput.selectionEnd;
            this._updateCursorVertices ();
        } else if (this.type === 'color') {
            this._text.style.backgroundColor = this._hiddenInput.value;
        }
    }
    protected _draw (renderer: Renderer) {
        super._draw (renderer);
        if (this._drawCursor && this._cursorBatch) {
            this._uiscene._drawBatchList (this._cursorBatch);
        }
    }
    get type(): string {
        return this.getAttribute ('type') || 'text';
    }
    set type(val: string) {
        if (val !== this.type) {
            if (val === 'text' || val === 'color') {
                this.setAttribute ('type', val);
                this._hiddenInput.type = val;
                if (val === 'text') {
                    this._text.textContent = this._hiddenInput.value;
                    this._text.style.backgroundColor = 'transparent';
                    this._selectionStart = 0;
                    this._selectionEnd = 0;
                    this.style.cursor = 'text';
                    if (this === this._uiscene.getFocus()) {
                        this._uiscene.setFocus (null);
                    }
                    this._invalidateContent ();
                } else {
                    this._stopCursorTimer ();
                    this._drawCursor = false;
                    this.style.cursor = 'default';
                    if (val === 'color') {
                        this._text.textContent = '';
                        this._text.style.backgroundColor = this._hiddenInput.value;
                    }
                }
            }
            this._updateHiddenInput ();
        }
    }
    /** @internal */
    _init (): void {
    }
    /** @internal */
    _getDefaultStyleSheet (): IStyleSheet {
        const style = super._getDefaultStyleSheet ();
        style.width = '150px';
        style.height = 'auto';
        style.cursor = 'text';
        style.color = '#000000';
        style.padding = '5';
        style.justifyContent = 'flex-start';
        style.backgroundColor = '#fff';
        style.borderWidth = '1px';
        style.borderColor = '#000';
        style.overflow = 'hidden';
        return style;
    }
    /** @internal */
    _updateHiddenInput () {
        let el: any = this._uiscene.renderer.getCanvas();
        let v = this.toAbsolute({ x:0, y:0 });
        let t = v.y + this.getRect().height;
        let l = v.x;
        if (el instanceof HTMLCanvasElement) {
            t += el.offsetTop;
            l += el.offsetLeft;
            while (el = el.offsetParent) {
                t += el.offsetTop;
                l += el.offsetLeft;
            }
        }
        if (this.type === 'color') {
            t -= this.getRect().height;
            this._hiddenInput.style.transform = '';
            this._hiddenInput.style.pointerEvents = 'auto';
        } else {
            this._hiddenInput.style.transform = 'scaleY(0)';
            this._hiddenInput.style.pointerEvents = 'none';
        }
        this._hiddenInput.style.left = `${l}px`;
        this._hiddenInput.style.top = `${t}px`;
        this._hiddenInput.style.width = `${this.getRect().width}px`;
        this._hiddenInput.style.height = `${this.getRect().height}px`;
        this._hiddenInput.style.font = `${this._getCachedFont().size}px ${this._getCachedFont().family}`;
    }
    protected _buildVertexData () {
        super._buildVertexData ();
        this._updateCursorVertices ();
    }
    private _setHiddenInputSelection (start: number, end: number) {
        if (this._hiddenInput.setSelectionRange) {
            this._hiddenInput.focus ();
            this._hiddenInput.selectionStart = start;
            this._hiddenInput.selectionEnd = end;
        } else {
            const ieInput = this._hiddenInput as any;
            if (ieInput.createTextRange) {
                const range = ieInput.createTextRange();
                range.collapse (true);
                range.moveEnd ('character', start);
                range.moveStart ('character', end);
                range.select ();
            }
        }
    }
    private _setHiddenInputCaretPosition (pos: number) {
        this._setHiddenInputSelection (pos, pos);
    }
    private _calcCursorPos (pos: number): number {
        let x = this.getClientRect().x;
        for (let i = 0; i < pos; i++) {
            const width = this._uiscene._getCharWidth (this._text.textContent[i], this._getCachedFont());
            x += width + this._text.charMargin;
        }
        return x;
    }
    private _updateCursorVertices () {
        const clipper = this._getClipper (true);
        if (clipper) {
            const x = this._calcCursorPos (this._selectionStart);
            const v = this.toAbsolute ({ x:0, y:0 });
            this._cursorBatch = new RMLPrimitiveBatchList (v.x, v.y);
            this._cursorBatch.addPrimitive (new RMLRectPrimitive(x, this.getClientRect().y - 2, 1, this.getClientRect().height, 0, 0, 0, 0), clipper, null, this._getCachedFontColor());
            // this._restartCursorTimer ();
        }
    }
    private _stopCursorTimer () {
        if (this._cursorTimer) {
            window.clearInterval (this._cursorTimer);
            this._cursorTimer = null;
        }
    }
    private _restartCursorTimer () {
        this._stopCursorTimer ();
        this._drawCursor = true;
        this._cursorTimer = window.setInterval (() => {
            this._drawCursor = !this._drawCursor;
        }, 500);
    }
}