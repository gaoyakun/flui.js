import { Vec4 } from '.';

export interface Renderer {
    getCanvas (): HTMLCanvasElement;
    getDrawingBufferWidth (): number;
    getDrawingBufferHeight (): number;
    createTexture (format: 'lum'|'rgba', width: number, height: number, color: Vec4, linear: boolean): unknown;
    updateTextureWithImage (texture: unknown, bitmap: ImageData, x: number, y: number): void;
    updateTextureWithCanvas (texture: unknown, cvs: HTMLCanvasElement, cvsOffsetX: number, cvsOffsetY: number, w: number, h: number, x: number, y: number): void;
    getTextureWidth (texture: unknown): number;
    getTextureHeight (texture: unknown): number;
    disposeTexture (texture: unknown): void;
    setCursorStyle (style: string): void;
    getCursorStyle (): string;
}