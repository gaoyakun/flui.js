import { Vector2 } from '../math';
import { AbstractTexture } from '../device';
import { disposable, Disposable } from '../defs';

export interface TextureAtlas extends Disposable<TextureAtlas> {}

@disposable()
export class TextureAtlas {
    protected _texture: AbstractTexture;
    protected _uvMin: Vector2;
    protected _uvMax: Vector2;
    protected _topLeftPatch9: Vector2;
    protected _bottomRightPatch9: Vector2;
    constructor (texture?: AbstractTexture, uvMin?: Vector2, uvMax?: Vector2, topLeftPatch9?: Vector2, bottomRightPatch9?: Vector2) {
        this._texture = texture?.retain() || null;
        this._uvMin = uvMin || Vector2.zero();
        this._uvMax = uvMax || Vector2.one();
        this._topLeftPatch9 = topLeftPatch9 || null;
        this._bottomRightPatch9 = bottomRightPatch9 || null;
    }
    get texture () {
        return this._texture;
    }
    set texture (tex: AbstractTexture) {
        tex?.retain ();
        this._texture?.release ();
        this._texture = tex;
    }
    get uvMin () {
        return this._uvMin;
    }
    set uvMin (v: Vector2) {
        this._uvMin.assign (v);
    }
    get uvMax () {
        return this._uvMax;
    }
    set uvMax (v: Vector2) {
        this._uvMax.assign (v);
    }
    get topLeftPatch9 () {
        return this._topLeftPatch9;
    }
    set topLeftPatch9 (v: Vector2) {
        this._topLeftPatch9 = v;
    }
    get bottomRightPatch9 () {
        return this._bottomRightPatch9;
    }
    set bottomRightPatch9 (v: Vector2) {
        this._bottomRightPatch9 = v;
    }
    dispose () {
        this._texture?.release ();
        this._texture = null;
    }
}
