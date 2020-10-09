import { Viewer, AbstractTexture, TextureFormat, Font, FontCanvas, AtlasManager } from '.';

export interface IGlyphInfo {
    atlasIndex: number;
    width: number;
    height: number;
    uMin: number;
    vMin: number;
    uMax: number;
    vMax: number;
}

const updateByCanvas: boolean = false;

export class GlyphManager extends AtlasManager<GlyphManager> {
    constructor (viewer: Viewer, cacheWidth?: number, cacheHeight?: number, cachePadding?: number) {
        super (viewer, Math.max (cacheWidth, 2), cacheHeight, cachePadding, TextureFormat.RGBA8, true);
    }
    getGlyphTexture (index: number): AbstractTexture {
        return this.getAtlasTexture (index);
    }
    getGlyphInfo (char: string, font: Font): IGlyphInfo {
        if (!char || !font) {
            return null;
        }
        let glyphInfo = this.getAtlasInfo(this._hash(char, font));
        if (!glyphInfo) {
            glyphInfo = this._cacheGlyph (char, font);
        }
        return glyphInfo;
    }
    measureStringWidth (str: string, charMargin: number, font: Font) {
        let w = 0;
        for (let i = 0; i < str.length; i++) {
            const margin = i === 0 ? 0 : charMargin;
            const glyphInfo = this.getGlyphInfo (str[i], font);
            w += margin + (glyphInfo ? glyphInfo.width : 0);
        }
        return w;
    }
    clipStringToWidth (str: string, width: number, charMargin: number, start: number, font: Font) {
        let sum = 0;
        let i = start;
        for (; i < str.length; i++) {
            const margin = i === start ? 0 : charMargin;
            const glyphInfo = this.getGlyphInfo (str[i], font);
            const charWidth = margin + (glyphInfo ? glyphInfo.width : 0);
            sum += charWidth;
            if (sum > width) {
                break;
            }
        }
        return i - start;
    }
    private _hash (char: string, font: Font) {
        return `${font.family}@${font.size}&${char}`;
    }
    private _cacheGlyph (char: string, font: Font): IGlyphInfo {
        if (updateByCanvas) {
            const bitmap = this._getGlyphBitmap (char, font) as {x:number,y:number,w:number,h:number };
            return this.pushCanvas (this._hash(char, font), FontCanvas.context, bitmap.x, bitmap.y, bitmap.w, bitmap.h);
        } else {
            const bitmap = this._getGlyphBitmap (char, font) as ImageData;
            return this.pushBitmap (this._hash(char, font), bitmap);
        }
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
    private _getGlyphBitmap (char: string, font: Font): ImageData|{x:number,y:number,w:number,h:number} {
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
        if (updateByCanvas) {
            FontCanvas.canvas.width = w;
            FontCanvas.canvas.height = h;
            FontCanvas.context.textBaseline = 'top';
            FontCanvas.context.fillStyle = '#ffffff';
        }
        FontCanvas.context.clearRect (0, 0, w + 2, h);
        FontCanvas.context.fillText (char, 0, -font.top);
        if (updateByCanvas) {
            return { x: 0, y: 0, w: w, h: h };
        } else {
            const bitmap = FontCanvas.context.getImageData(0, 0, w, h);
            return bitmap;
        }
    }
}