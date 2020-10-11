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
    constructor (cvs: HTMLCanvasElement) {
        this._canvas = cvs;
    }
    getCanvas (): HTMLCanvasElement {
        return this._canvas;
    }
    getDrawingBufferWidth (): number {
        return this._canvas.width;
    }
    getDrawingBufferHeight (): number {
        return this._canvas.height;
    }
    createTexture (width: number, height: number, color: Vec4, linear: boolean): unknown {
        const offscreenCanvas = new OffscreenCanvas (width, height);
        const ctx = offscreenCanvas.getContext ('2d');
        ctx.fillStyle = `rgba(${Math.floor(color.x * 255)},${Math.floor(color.y * 255)},${Math.floor(color.z * 255)},${color.w})`;
        ctx.fillRect (0, 0, width, height);
        return ctx;
    }
    updateTextureWithImage (texture: unknown, bitmap: ImageData, x: number, y: number): void {
        const ctx = texture as OffscreenCanvasRenderingContext2D;
        ctx.putImageData (bitmap, x, y);
    }
    updateTextureWithCanvas (texture: unknown, cvs: HTMLCanvasElement, cvsOffsetX: number, cvsOffsetY: number, w: number, h: number, x: number, y: number): void {
        const ctx = texture as OffscreenCanvasRenderingContext2D;
        ctx.drawImage (cvs, cvsOffsetX, cvsOffsetY, w, h, x, y, w, h);
    }
    getTextureWidth (texture: unknown): number {
        const ctx = texture as OffscreenCanvasRenderingContext2D;
        return ctx.canvas.width;
    }
    getTextureHeight (texture: unknown): number {
        const ctx = texture as OffscreenCanvasRenderingContext2D;
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

    }
    beginRender (): void;
    endRender (): void;
}