import { Renderer, Texture, Vec4, Font, FontCanvas, AtlasManager } from '.';

export interface IGlyphInfo {
    atlasIndex: number;
    width: number;
    height: number;
    uMin: number;
    vMin: number;
    uMax: number;
    vMax: number;
}

export class GlyphManager extends AtlasManager<GlyphManager> {
    constructor (renderer: Renderer, cacheWidth?: number, cacheHeight?: number, cachePadding?: number) {
        super (renderer, Math.max (cacheWidth, 2), cacheHeight, cachePadding, true);
    }
    getGlyphTexture (index: number): Texture {
        return this.getAtlasTexture (index);
    }
    getGlyphInfo (char: string, font: Font, color: Vec4): IGlyphInfo {
        if (!char || !font || !color) {
            return null;
        }
        let glyphInfo = this.getAtlasInfo(this._hash(char, font, color));
        if (!glyphInfo) {
            glyphInfo = this._cacheGlyph (char, font, color);
        }
        return glyphInfo;
    }
    measureStringWidth (str: string, charMargin: number, font: Font) {
        let w = 0;
        for (let i = 0; i < str.length; i++) {
            w += charMargin + this.getCharWidth (str[i], font);
        }
        return w;
    }
    clipStringToWidth (str: string, width: number, charMargin: number, start: number, font: Font) {
        let sum = 0;
        let i = start;
        for (; i < str.length; i++) {
            sum += charMargin + this.getCharWidth (str[i], font);
            if (sum > width) {
                break;
            }
        }
        return i - start;
    }
    private _normalizeColor (color: Vec4): string {
        const r = `0${(Math.round(color.x * 255) & 0xff).toString(16)}`.slice(-2);
        const g = `0${(Math.round(color.y * 255) & 0xff).toString(16)}`.slice(-2);
        const b = `0${(Math.round(color.z * 255) & 0xff).toString(16)}`.slice(-2);
        return `#${r}${g}${b}`;
    }
    private _hash (char: string, font: Font, color: Vec4) {
        const clr = this._renderer.supportColorComposition() ? '' : `@${this._normalizeColor(color)}`;
        return `${font.family}@${font.size}${clr}&${char}`;
    }
    private _cacheGlyph (char: string, font: Font, color: Vec4): IGlyphInfo {
        const bitmap = this._getGlyphBitmap (char, font, color) as ImageData;
        return this.pushBitmap (this._hash(char, font, color), bitmap);
        /*
        if (bitmap) {
            const rc = this._packer.add (bitmap.width, bitmap.height, null);
            if (rc) {
                this._updateAtlasTexture (this._packer.bins.length - 1, bitmap, rc.x, rc.y, rc.width, rc.height);
                const glyphInfo: IGlyphInfo = {
                    atlasIndex: this._packer.bins.length - 1,
                    uMin: rc.x / (this._cacheWidth + this._cachePadding),
                    vMin: rc.y / (this._cacheHeight + this._cachePadding),
                    uMax: (rc.x + rc.width) / (this._cacheWidth + this._cachePadding),
                    vMax: (rc.y + rc.height) / (this._cacheHeight + this._cachePadding),
                    width: rc.width,
                    height: rc.height
                }
                this._glyphInfoMap[this._hash(char, font)] = glyphInfo;
                return glyphInfo;
            }
        }
        return null;
        */
    }
    getCharWidth (char: string, font: Font): number {
        if (!font) {
            return 0;
        }
        FontCanvas.font = font;
        const metric = FontCanvas.context.measureText (char);
        let w = metric.width;
        if (w === 0) {
            return 0;
        }
        if (typeof metric.actualBoundingBoxRight === 'number') {
            w = Math.floor(Math.max(w, metric.actualBoundingBoxRight) + 0.8);
        }
        return w;
    }
    private _getGlyphBitmap (char: string, font: Font, color: Vec4): ImageData|{x:number,y:number,w:number,h:number} {
        if (!font) {
            return null;
        }
        FontCanvas.font = font;
        const metric = FontCanvas.context.measureText (char);
        let w = metric.width;
        if (w === 0) {
            return null;
        }
        if (typeof metric.actualBoundingBoxRight === 'number') {
            w = Math.floor(Math.max(w, metric.actualBoundingBoxRight) + 0.8);
        }
        let h = font.bottom - font.top + 1;
        FontCanvas.context.fillStyle = this._renderer.supportColorComposition() ? '#fff' : this._normalizeColor (color);
        FontCanvas.context.clearRect (0, 0, w + 2, h);
        FontCanvas.context.fillText (char, 0, -font.top);
        const bitmap = FontCanvas.context.getImageData(0, 0, w, h);
        return bitmap;
    }
}