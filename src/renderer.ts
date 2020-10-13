import { Vec4 } from '.';

export interface Renderer {
    getCanvas (): HTMLCanvasElement;
    getDrawingBufferWidth (): number;
    getDrawingBufferHeight (): number;
    createTexture (width: number, height: number, color: Vec4, linear: boolean): unknown;
    updateTextureWithImage (texture: unknown, bitmap: ImageData, x: number, y: number): void;
    updateTextureWithCanvas (texture: unknown, cvs: HTMLCanvasElement, cvsOffsetX: number, cvsOffsetY: number, w: number, h: number, x: number, y: number): void;
    getTextureWidth (texture: unknown): number;
    getTextureHeight (texture: unknown): number;
    disposeTexture (texture: unknown): void;
    setCursorStyle (style: string): void;
    getCursorStyle (): string;
    drawQuads (data: Float32Array, texture: unknown): void;
    beginRender (): void;
    endRender (): void;
}


export class CanvasRenderer implements Renderer {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _textures: CanvasRenderingContext2D[];
    constructor (cvs: HTMLCanvasElement|CanvasRenderingContext2D) {
        if (cvs instanceof HTMLCanvasElement) {
            this._canvas = cvs;
            this._ctx = this._canvas.getContext('2d');
            this._ctx.imageSmoothingEnabled = false;
        } else {
            this._canvas = cvs.canvas;
            this._ctx = cvs;
        }
        this._textures = [];
    }
    getTextures () {
        return this._textures;
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
    createTexture (width: number, height: number, color: Vec4, linear: boolean): unknown {
        const cvs = document.createElement('canvas');
        cvs.style.width = `${width}px`;
        cvs.style.height = `${height}px`;
        cvs.width = width;
        cvs.height = height;
        const ctx = cvs.getContext ('2d');
        ctx.clearRect (0, 0, width, height);
        ctx.fillStyle = `rgba(${Math.floor(color.x * 255)},${Math.floor(color.y * 255)},${Math.floor(color.z * 255)},${color.w})`;
        ctx.fillRect (0, 0, width, height);
        this._textures.push (ctx);
        document.body.append (cvs);
        return ctx;
    }
    updateTextureWithImage (texture: unknown, bitmap: ImageData, x: number, y: number): void {
        const ctx = texture as CanvasRenderingContext2D;
        ctx.putImageData (bitmap, x, y);
    }
    updateTextureWithCanvas (texture: unknown, cvs: HTMLCanvasElement, cvsOffsetX: number, cvsOffsetY: number, w: number, h: number, x: number, y: number): void {
        const ctx = texture as CanvasRenderingContext2D;
        ctx.drawImage (cvs, cvsOffsetX, cvsOffsetY, w, h, x, y, w, h);
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
    beginRender (): void {
    }
    endRender (): void {
    }
}