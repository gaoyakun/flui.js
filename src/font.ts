import { assert } from './types';

export class FontCanvas {
    private static _canvas: HTMLCanvasElement = null;
    private static _context: CanvasRenderingContext2D = null;
    private static _currentFont: Font = null;
    static get canvas () {
        this._realize ();
        return this._canvas;
    }
    static get context () {
        this._realize ();
        return this._context;
    }
    static get font () {
        return this._currentFont;
    }
    static set font (font: Font) {
        if (font && font !== this._currentFont) {
            this.context.font = font.fontName;
            this._currentFont = font;
        }
    }
    private static _realize () {
        if (!this._canvas) {
            this._canvas = document.createElement ('canvas');
            this._canvas.width = 512;
            this._canvas.height = 512;
            this._canvas.style.left = '-10000px';
            this._canvas.style.position = 'absolute';
            document.body.appendChild (this._canvas);
            this._context = this._canvas.getContext ('2d');
            this._context.textBaseline = 'top';
            this._context.textAlign = 'left';
            this._context.fillStyle = 'transparent';
            this._context.fillRect (0, 0, this._canvas.width, this._canvas.height);
            this._context.fillStyle = '#ffffff';
            this._context.imageSmoothingEnabled = true;
        }
    }
}

export class Font {
    private _name;
    private _size: number;
    private _family: string;
    private _top: number;
    private _bottom: number;
    constructor (name: string) {
        this.fontName = name;
        this._top = 0;
        this._bottom = 0;
        this._size = 0;
        this._family = '';
        this._name = name;
        if (this._name) {
            this._normalizeFont ();
        }
    }
    get fontName (): string {
        return this._name;
    }
    set fontName (name: string) {
        this._name = name;
        this._normalizeFont ();
    }
    get size (): number {
        return this._size;
    }
    get family (): string {
        return this._family;
    }
    get top (): number {
        return this._top;
    }
    get bottom (): number {
        return this._bottom;
    }
    get maxHeight (): number {
        return this._bottom - this._top + 1;
    }
    equalTo (other: Font): boolean {
        return this._size === other._size && this._family === other._family;
    }
    private _measureFontHeight (): number[] {
        const oldFont = FontCanvas.context.font;
        const oldTextBaseline = FontCanvas.context.textBaseline;
        const oldFillStyle = FontCanvas.context.fillStyle;
        FontCanvas.context.font = this._name;
        const testString = 'bdfghijklpq国美|_~';
        const metric = FontCanvas.context.measureText (testString);
        let top: number, bottom: number;
        if (typeof metric.fontBoundingBoxAscent === 'number' && typeof metric.fontBoundingBoxDescent === 'number') {
            top = Math.floor(metric.fontBoundingBoxAscent);
            bottom = Math.ceil(metric.fontBoundingBoxDescent);
        } else {
            top = 0;
            bottom = this._size - 1;
            const extra = 10;
            const halfExtra = extra >>1;
            const maxWidth = Math.ceil(metric.width) + extra;
            const maxHeight = this._size + extra;
            FontCanvas.context.clearRect (0, 0, maxWidth, maxHeight);
            FontCanvas.context.textBaseline = 'top';
            FontCanvas.context.fillStyle = '#ffffff';
            FontCanvas.context.fillText (testString, halfExtra, halfExtra);
            const bitmap = FontCanvas.context.getImageData (0, 0, maxWidth, maxHeight);
            const pixels = bitmap.data;
            for (let i = 0; i < maxWidth * maxHeight; i++) {
                if (pixels[i*4+3] > 0) {
                    top = Math.floor(i / maxWidth);
                    break;
                }
            }
            for (let i = maxWidth * maxHeight - 1; i >= 0; i--) {
                if (pixels[i*4+3] > 0) {
                    bottom = Math.floor(i / maxWidth);
                    break;
                }
            }
            top -= halfExtra;
            bottom -= halfExtra;
        }
        FontCanvas.context.font = oldFont;
        FontCanvas.context.textBaseline = oldTextBaseline;
        FontCanvas.context.fillStyle = oldFillStyle;

        return [top, bottom];
    }
    private _normalizeFont (): void {
        const oldFont = FontCanvas.context.font;
        FontCanvas.context.font = this._name;
        this._name = FontCanvas.context.font;
        const fontParts = this._name.split(/\s+/);
        assert (fontParts.length >= 2, 'normalize font failed', true);
        let sizePart = fontParts[fontParts.length-2];
        assert (sizePart.substr (sizePart.length-2) === 'px', 'normalize font failed', true);
        this._size = parseInt(sizePart.substr(0, sizePart.length-2));
        this._family = fontParts[fontParts.length-1];
        [this._top, this._bottom] = [...this._measureFontHeight ()];
        FontCanvas.context.font = oldFont;
    }
}