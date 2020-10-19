import { Vec4, GUI, GUIMouseEvent } from '.';

export enum MouseButton {
    LEFT = 1<<0,
    RIGHT = 1<<1,
    MIDDLE = 1<<2,
}

export enum KeyMod {
    SHIFT = 1<<0,
    ALT = 1<<1,
    CTRL = 1<<2,
    META = 1<<3
}

export enum Key {
    ESCAPE = 27,
    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,
    F13 = 124,
    F14 = 125,
    F15 = 126,
    F16 = 127,
    F17 = 128,
    F18 = 129,
    F19 = 130,
    BACK_QUOTE = 192,
    DIGIT_0 = 48,
    DIGIT_1 = 49,
    DIGIT_2 = 50,
    DIGIT_3 = 51,
    DIGIT_4 = 52,
    DIGIT_5 = 53,
    DIGIT_6 = 54,
    DIGIT_7 = 55,
    DIGIT_8 = 56,
    DIGIT_9 = 57,
    MINUS = 189,
    EQUAL = 187,
    BACK_SPACE = 8,
    TAB = 9,
    CAPSLOCK = 20,
    A = 65,
    B = 66,
    C = 67,
    D = 68,
    E = 69,
    F = 70,
    G = 71,
    H = 72,
    I = 73,
    J = 74,
    K = 75,
    L = 76,
    M = 77,
    N = 78,
    O = 79,
    P = 80,
    Q = 81,
    R = 82,
    S = 83,
    T = 84,
    U = 85,
    V = 86,
    W = 87,
    X = 88,
    Y = 89,
    Z = 90,
    LEFT_BRACKET = 219,
    RIGHT_BRACKET = 221,
    BACK_SLASH = 220,
    ENTER = 13,
    QUOTE = 222,
    SEMICOLON = 186,
    COMMA = 188,
    PERIOD = 190,
    SLASH = 191,
    SHIFT = 16,
    CONTROL = 17,
    ALT = 18,
    META = 91,
    SPACE = 32,
    PAGE_UP = 33,
    PAGE_DOWN = 34,
    END = 35,
    HOME = 36,
    DELETE = 46,
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40,
    NUMLOCK = 12,
    NUMPAD_EQUAL = 187,
    NUMPAD_DIV = 111,
    NUMPAD_MUL = 106,
    NUMPAD_ADD = 107,
    NUMPAD_SUB = 108,
    NUMPAD_DECIMAL = 110,
}

const buttonMap = [ MouseButton.LEFT, MouseButton.MIDDLE, MouseButton.RIGHT ];

export interface Renderer {
    getCanvas (): HTMLCanvasElement;
    getDrawingBufferWidth (): number;
    getDrawingBufferHeight (): number;
    supportColorComposition (): boolean;
    createTexture (width: number, height: number, color: Vec4, linear: boolean): unknown;
    updateTextureWithImage (texture: unknown, bitmap: ImageData, x: number, y: number): void;
    updateTextureWithCanvas (texture: unknown, ctx: CanvasRenderingContext2D, cvsOffsetX: number, cvsOffsetY: number, w: number, h: number, x: number, y: number): void;
    getTextureWidth (texture: unknown): number;
    getTextureHeight (texture: unknown): number;
    disposeTexture (texture: unknown): void;
    setCursorStyle (style: string): void;
    getCursorStyle (): string;
    drawQuads (data: Float32Array, texture: unknown): void;
    injectEvents (gui: GUI): void;
    beginRender (): void;
    endRender (): void;
}


export class CanvasRenderer implements Renderer {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    constructor (cvs: HTMLCanvasElement|CanvasRenderingContext2D) {
        if (cvs instanceof HTMLCanvasElement) {
            this._canvas = cvs;
            this._ctx = this._canvas.getContext('2d', { alpha:true });
            this._ctx.imageSmoothingEnabled = false;
        } else {
            this._canvas = cvs.canvas;
            this._ctx = cvs;
        }
    }
    getCanvas (): HTMLCanvasElement {
        return this._canvas;
    }
    getContext (): CanvasRenderingContext2D {
        return this._ctx;
    }
    getDrawingBufferWidth (): number {
        return this._canvas.width;
    }
    getDrawingBufferHeight (): number {
        return this._canvas.height;
    }
    supportColorComposition (): boolean {
        return false;
    }
    createTexture (width: number, height: number, color: Vec4, linear: boolean): unknown {
        const cvs = document.createElement('canvas');
        cvs.style.width = `${width}px`;
        cvs.style.height = `${height}px`;
        cvs.width = width;
        cvs.height = height;
        const ctx = cvs.getContext ('2d', { alpha: true });
        ctx.clearRect (0, 0, width, height);
        ctx.fillStyle = `rgba(${Math.floor(color.x * 255)},${Math.floor(color.y * 255)},${Math.floor(color.z * 255)},${color.w})`;
        ctx.fillRect (0, 0, width, height);
        return ctx;
    }
    updateTextureWithImage (texture: unknown, bitmap: ImageData, x: number, y: number): void {
        const ctx = texture as CanvasRenderingContext2D;
        ctx.putImageData (bitmap, x, y);
    }
    updateTextureWithCanvas (texture: unknown, ctx: CanvasRenderingContext2D, cvsOffsetX: number, cvsOffsetY: number, w: number, h: number, x: number, y: number): void {
        const img = ctx.getImageData (cvsOffsetX, cvsOffsetY, w, h);
        this.updateTextureWithImage (texture, img, x, y);
        // ctx.drawImage (cvs, cvsOffsetX, cvsOffsetY, w, h, x, y, w, h);
    }
    getTextureWidth (texture: unknown): number {
        const ctx = texture as CanvasRenderingContext2D;
        return ctx.canvas.width;
    }
    getTextureHeight (texture: unknown): number {
        const ctx = texture as CanvasRenderingContext2D;
        return ctx.canvas.height;
    }
    disposeTexture (texture: unknown): void {

    }
    setCursorStyle (style: string): void {
        this._canvas.style.cursor = style;
    }
    getCursorStyle (): string {
        return this._canvas.style.cursor;
    }
    drawQuads (data: Float32Array, texture: unknown): void {
        const numQuads = data.length / 36;
        const round = Math.round;
        const floor = Math.floor;
        for (let i = 0; i < numQuads; i++) {
            const base = i * 36;
            const x1 = data[base];
            const y1 = data[base+1];
            const x2 = data[base+9];
            const y2 = data[base+10];
            const x3 = data[base+18];
            const y3 = data[base+19];
            const x4 = data[base+27];
            const y4 = data[base+28];
            const r = data[base + 3];
            const g = data[base + 4];
            const b = data[base + 5];
            const a = data[base + 6];
            if (y1 === y2 && y3 === y4 && x1 === x4 && x2 === x3) {
                if (texture) {
                    const tw = this.getTextureWidth (texture);
                    const th = this.getTextureHeight (texture);
                    const u1 = round(data[base + 7] * tw);
                    const v1 = round(data[base + 8] * th);
                    const u2 = round(data[base + 25] * tw);
                    const v2 = round(data[base + 26] * th);
                    this._ctx.drawImage ((texture as CanvasRenderingContext2D).canvas, u1, v1, u2 - u1, v2 - v1, x1, y1, x3 - x1, y3 - y1);
                } else {
                    this._ctx.fillStyle = `rgba(${floor(r * 255)},${floor(g * 255)},${floor(b * 255)},${a})`;
                    this._ctx.fillRect (x1, y1, x3 - x1, y3 - y1);
                }
            } else {
                this._ctx.fillStyle = `rgba(${floor(r * 255)},${floor(g * 255)},${floor(b * 255)},${a})`;
                this._ctx.beginPath ();
                this._ctx.moveTo (x1, y1);
                this._ctx.lineTo (x2, y2);
                this._ctx.lineTo (x3, y3);
                this._ctx.lineTo (x4, y4);
                this._ctx.closePath ();
                this._ctx.fill ();
            }
        }
    }
    injectEvents (gui: GUI): void {
        type MouseEventName = 'mousedown'|'mouseup'|'mousemove'|'click'|'dblclick';
        const mouseEventNames: MouseEventName[] = ['mousedown', 'mouseup', 'mousemove', 'click', 'dblclick'];
        const rendererEventNames = [GUIMouseEvent.NAME_RENDERER_MOUSEDOWN, GUIMouseEvent.NAME_RENDERER_MOUSEUP, GUIMouseEvent.NAME_RENDERER_MOUSEMOVE, GUIMouseEvent.NAME_RENDERER_MOUSECLICK, GUIMouseEvent.NAME_RENDERER_MOUSEDBLCLICK];
        for (let i = 0; i < mouseEventNames.length; i++) {
            this._canvas.addEventListener (mouseEventNames[i], (evt: MouseEvent) => {
                gui.dispatchEvent (this._createMouseEvent (rendererEventNames[i], evt));
            });
        }
    }
    beginRender (): void {
    }
    endRender (): void {
    }
    private _createMouseEvent (type: string, src: MouseEvent): GUIMouseEvent {
        const x = src.offsetX;
        const y = src.offsetY;
        const button = buttonMap[src.button];
        let keymod = 0;
        if (src.shiftKey) {
            keymod |= KeyMod.SHIFT;
        }
        if (src.altKey) {
            keymod |= KeyMod.ALT;
        }
        if (src.ctrlKey) {
            keymod |= KeyMod.CTRL;
        }
        if (src.metaKey) {
            keymod |= KeyMod.META;
        }
        return new GUIMouseEvent (type, x, y, button, keymod);
    }
}