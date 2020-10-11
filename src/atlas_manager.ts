import { MaxRectsPacker } from './maxrects-packer';
import { Texture } from './types';
import { Renderer } from './renderer'; 

export interface IAtlasInfo {
    atlasIndex: number;
    width: number;
    height: number;
    uMin: number;
    vMin: number;
    uMax: number;
    vMax: number;
}

export class AtlasManager<U extends AtlasManager<any> = AtlasManager<any> > {
    /** @internal */
    protected static readonly ATLAS_WIDTH = 1024;
    /** @internal */
    protected static readonly ATLAS_HEIGHT = 1024;
    /** @internal */
    protected _renderer: Renderer;
    /** @internal */
    protected _packer: MaxRectsPacker;
    /** @internal */
    protected _cachePadding: number;
    /** @internal */
    protected _cacheWidth: number;
    /** @internal */
    protected _cacheHeight: number;
    /** @internal */
    protected _linearSpace: boolean;
    /** @internal */
    protected _atlasList: Texture[];
    /** @internal */
    protected _atlasInfoMap: { [hash:string]: IAtlasInfo };
    constructor (renderer: Renderer, cacheWidth?: number, cacheHeight?: number, cachePadding?: number, linearSpace?: boolean) {
        this._renderer = renderer;
        this._cacheWidth = typeof cacheWidth === 'number' ? (cacheWidth||AtlasManager.ATLAS_WIDTH) : AtlasManager.ATLAS_WIDTH;
        this._cacheHeight = typeof cacheHeight === 'number' ? (cacheHeight||AtlasManager.ATLAS_HEIGHT) : AtlasManager.ATLAS_HEIGHT;
        this._cachePadding = 1; // typeof cachePadding === 'number' ? cachePadding : 2;
        this._linearSpace = !!linearSpace;
        this._packer = new MaxRectsPacker (this._cacheWidth, this._cacheHeight, this._cachePadding, { smart: true, pot: false, square: false, allowRotation: false, tag: false });
        this._atlasList = [];
        this._atlasInfoMap = {};
    }
    getAtlasTexture (index: number): Texture {
        return this._atlasList[index];
    }
    getAtlasInfo (key: string): IAtlasInfo {
        return this._atlasInfoMap[key] || null;
    }
    dispose () {
        for (const tex of this._atlasList) {
            this._renderer.disposeTexture(tex);
        }
        this._atlasList = null;
    }
    pushCanvas (key: string, ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        if (ctx) {
            const rc = this._packer.add (w, h, null);
            if (rc) {
                this._updateAtlasTextureCanvas (this._packer.bins.length - 1, ctx, rc.x, rc.y, rc.width, rc.height, x, y);
                const info: IAtlasInfo = {
                    atlasIndex: this._packer.bins.length - 1,
                    uMin: rc.x / (this._cacheWidth + this._cachePadding),
                    vMin: rc.y / (this._cacheHeight + this._cachePadding),
                    uMax: (rc.x + rc.width) / (this._cacheWidth + this._cachePadding),
                    vMax: (rc.y + rc.height) / (this._cacheHeight + this._cachePadding),
                    width: rc.width,
                    height: rc.height
                }
                this._atlasInfoMap[key] = info;
                return info;
            }
        }
    }
    pushBitmap (key: string, bitmap: ImageData): IAtlasInfo {
        if (bitmap) {
            const rc = this._packer.add (bitmap.width, bitmap.height, null);
            if (rc) {
                this._updateAtlasTexture (this._packer.bins.length - 1, bitmap, rc.x, rc.y, rc.width, rc.height);
                const info: IAtlasInfo = {
                    atlasIndex: this._packer.bins.length - 1,
                    uMin: rc.x / (this._cacheWidth + this._cachePadding),
                    vMin: rc.y / (this._cacheHeight + this._cachePadding),
                    uMax: (rc.x + rc.width) / (this._cacheWidth + this._cachePadding),
                    vMax: (rc.y + rc.height) / (this._cacheHeight + this._cachePadding),
                    width: rc.width,
                    height: rc.height
                }
                this._atlasInfoMap[key] = info;
                return info;
            }
        }
        return null;
    }
    private _updateAtlasTextureCanvas (atlasIndex: number, bitmap: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, xOffset: number, yOffset: number) {
        let textureAtlas: Texture = null;
        if (atlasIndex === this._atlasList.length) {
            textureAtlas = this._renderer.createTexture (this._cacheWidth + this._cachePadding, this._cacheHeight + this._cachePadding, {x:0,y:0,z:0,w:0}, this._linearSpace);
            this._atlasList.push (textureAtlas);
        } else {
            textureAtlas = this._atlasList[atlasIndex];
        }
        this._renderer.updateTextureWithCanvas (textureAtlas, bitmap.canvas, xOffset, yOffset, w, h, x, y);
    }
    private _updateAtlasTexture (atlasIndex: number, bitmap: ImageData, x: number, y: number, w: number, h: number) {
        let textureAtlas: Texture = null;
        if (atlasIndex === this._atlasList.length) {
            textureAtlas = this._renderer.createTexture (this._cacheWidth + this._cachePadding, this._cacheHeight + this._cachePadding, {x:0,y:0,z:0,w:0}, this._linearSpace);
            this._atlasList.push (textureAtlas);
        } else {
            textureAtlas = this._atlasList[atlasIndex];
        }
        this._renderer.updateTextureWithImage (textureAtlas, bitmap, x, y);
    }
}