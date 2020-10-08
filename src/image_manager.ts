import { TextureAtlas } from '.';
import { Vector2 } from '../math';
import { disposable, Disposable } from '../defs';
import { Viewer, AtlasManager, IAtlasInfo, TextureFormat, AbstractTexture } from '../device';

export interface ImageManager extends Disposable<ImageManager> {}

@disposable()
export class ImageManager {
    protected _viewer: Viewer;
    protected _atlasManager: AtlasManager;
    protected _cachedImages: { [name:string]: TextureAtlas };
    protected _urlImages: { [url:string]: TextureAtlas };
    private static _tempElement: HTMLAnchorElement = null;
    constructor (viewer: Viewer) {
        this._viewer = viewer;
        this._cachedImages = {};
        this._urlImages = {};
        this._atlasManager = new AtlasManager (viewer, 1024, 1024, 1, TextureFormat.RGBA8, false);
        this._createBuiltinImages ();
    }
    get viewer () {
        return this._viewer;
    }
    getImage (name: string): TextureAtlas {
        return this._cachedImages[name] || null;
    }
    // FIXME
    getImageByURL (url: string): TextureAtlas {
        if (!this._urlImages[url]) {
            url = ImageManager._resolveURL (url);
            const texture = this._viewer.loadTextureFromURL (url, false);
            if (texture) {
                this._urlImages[url] = new TextureAtlas (texture, Vector2.zero(), Vector2.one()).retain();
            }
        }
        return this._urlImages[url] || null;
    }
    dispose () {
        for (const k in this._cachedImages) {
            this._cachedImages[k].release();
        }
        for (const k in this._urlImages) {
            this._urlImages[k].release();
        }
        this._cachedImages = {};
        this._urlImages = {};
    }
    private static _resolveURL (url: string): string {
        if (!this._tempElement) {
            this._tempElement = document.createElement('a');
        }
        this._tempElement.href = url;
        return this._tempElement.href;        
    }
    private _createBuiltinImages () {
        let cvs = document.createElement('canvas');
        cvs.width = 256;
        cvs.height = 256;
        const ctx = cvs.getContext('2d');
        let offsetX = 0;
        let offsetY = 0;
        
        // 测量stroke偏移
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#ffffff';
        ctx.clearRect (0, 0, 10, 2);
        ctx.beginPath ();
        ctx.moveTo (0, 0);
        ctx.lineTo (10, 0);
        ctx.stroke ();
        const bitmap = ctx.getImageData (0, 0, 10, 2);
        if (bitmap.data[5 * 4 + 3] < 255) {
            offsetX = 0.5;
            offsetY = 0.5;
        }
    
        let size = 10;
        let atlasInfo: IAtlasInfo;
        ctx.fillStyle = '#ffffff';
    
        // input
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.clearRect (0, 0, size, size);
        ctx.beginPath ();
        const radius = (size - 2) / 2;
        ctx.ellipse (1 + radius + offsetX, 1 + radius + offsetY, radius, radius, 0, 0, 2 * Math.PI);
        ctx.fill ();
        ctx.stroke ();
        atlasInfo = this._atlasManager.pushCanvas ('default.input', ctx, 0, 0, size, size);
        this._cachedImages['default.input'] = new TextureAtlas (this._atlasManager.getAtlasTexture(atlasInfo.atlasIndex), 
            new Vector2(atlasInfo.uMin, atlasInfo.vMin),
            new Vector2(atlasInfo.uMax, atlasInfo.vMax),
            new Vector2(0.5, 0.5),
            new Vector2(0.5, 0.5));
    
        // button
        ctx.clearRect (0, 0, size, size);
        ctx.beginPath ();
        ctx.ellipse (1 + radius + offsetX, 1 + radius + offsetY, radius, radius, 0, 0, 2 * Math.PI);
        ctx.fill ();
        atlasInfo = this._atlasManager.pushCanvas ('default.button', ctx, 0, 0, size, size);
        this._cachedImages['default.button'] = new TextureAtlas (this._atlasManager.getAtlasTexture(atlasInfo.atlasIndex), 
            new Vector2(atlasInfo.uMin, atlasInfo.vMin),
            new Vector2(atlasInfo.uMax, atlasInfo.vMax),
            new Vector2(0.5, 0.5),
            new Vector2(0.5, 0.5));
    
        size = 32;
        ctx.clearRect (0, 0, size, size);
        pathTriangle (ctx, ORIENTATION_VERTICAL, 16, 24, -10, 10, -14);
        ctx.fill ();
        atlasInfo = this._atlasManager.pushCanvas ('default.scrollbar.up', ctx, 0, 0, size, size);
        this._cachedImages['default.scrollbar.up'] = new TextureAtlas (this._atlasManager.getAtlasTexture(atlasInfo.atlasIndex), 
        new Vector2(atlasInfo.uMin, atlasInfo.vMin),
        new Vector2(atlasInfo.uMax, atlasInfo.vMax));

        ctx.clearRect (0, 0, size, size);
        pathTriangle (ctx, ORIENTATION_VERTICAL, 16, 10, -10, 10, 14);
        ctx.fill ();
        atlasInfo = this._atlasManager.pushCanvas ('default.scrollbar.down', ctx, 0, 0, size, size);
        this._cachedImages['default.scrollbar.down'] = new TextureAtlas (this._atlasManager.getAtlasTexture(atlasInfo.atlasIndex), 
            new Vector2(atlasInfo.uMin, atlasInfo.vMin),
            new Vector2(atlasInfo.uMax, atlasInfo.vMax));
       
        ctx.clearRect (0, 0, size, size);
        pathTriangle (ctx, ORIENTATION_HORIZONAL, 24, 16, -10, 10, -14);
        ctx.fill ();
        atlasInfo = this._atlasManager.pushCanvas ('default.scrollbar.left', ctx, 0, 0, size, size);
        this._cachedImages['default.scrollbar.left'] = new TextureAtlas (this._atlasManager.getAtlasTexture(atlasInfo.atlasIndex), 
            new Vector2(atlasInfo.uMin, atlasInfo.vMin),
            new Vector2(atlasInfo.uMax, atlasInfo.vMax));
       
        ctx.clearRect (0, 0, size, size);
        pathTriangle (ctx, ORIENTATION_HORIZONAL, 10, 16, -10, 10, 14);
        ctx.fill ();
        atlasInfo = this._atlasManager.pushCanvas ('default.scrollbar.right', ctx, 0, 0, size, size);
        this._cachedImages['default.scrollbar.right'] = new TextureAtlas (this._atlasManager.getAtlasTexture(atlasInfo.atlasIndex), 
            new Vector2(atlasInfo.uMin, atlasInfo.vMin),
            new Vector2(atlasInfo.uMax, atlasInfo.vMax));

        cvs = null;
    }
}

const ORIENTATION_HORIZONAL = 0;
const ORIENTATION_VERTICAL = 1;

function pathTriangle (ctx: CanvasRenderingContext2D, orientation: number, anchorX: number, anchorY: number, left: number, right: number, top: number) {
    ctx.beginPath ();
    if (orientation === ORIENTATION_VERTICAL) {
        ctx.moveTo (anchorX + left, anchorY);
        ctx.lineTo (anchorX + right, anchorY);
        ctx.lineTo (anchorX, anchorY + top);
    } else {
        ctx.moveTo (anchorX, anchorY + left);
        ctx.lineTo (anchorX, anchorY + right);
        ctx.lineTo (anchorX + top, anchorY);
    }
    ctx.closePath ();
}
