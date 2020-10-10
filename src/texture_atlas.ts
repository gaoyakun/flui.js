import { Vec2, Texture } from '.';

export class TextureAtlas {
    /** @internal */
    protected _texture: Texture;
    /** @internal */
    protected _uvMin: Vec2;
    /** @internal */
    protected _uvMax: Vec2;
    /** @internal */
    protected _topLeftPatch9: Vec2;
    /** @internal */
    protected _bottomRightPatch9: Vec2;
    constructor (texture?: Texture, uvMin?: Vec2, uvMax?: Vec2, topLeftPatch9?: Vec2, bottomRightPatch9?: Vec2) {
        this._texture = texture || null;
        this._uvMin = uvMin || { x:0, y:0 };
        this._uvMax = uvMax || { x:1, y:1 };
        this._topLeftPatch9 = topLeftPatch9 || null;
        this._bottomRightPatch9 = bottomRightPatch9 || null;
    }
    get texture () {
        return this._texture;
    }
    set texture (tex: Texture) {
        this._texture = tex;
    }
    get uvMin () {
        return this._uvMin;
    }
    set uvMin (v: Vec2) {
        this._uvMin.x = v.x;
        this._uvMin.y = v.y;
    }
    get uvMax () {
        return this._uvMax;
    }
    set uvMax (v: Vec2) {
        this._uvMax.x = v.x;
        this._uvMax.y = v.y;
    }
    get topLeftPatch9 () {
        return this._topLeftPatch9;
    }
    set topLeftPatch9 (v: Vec2) {
        this._topLeftPatch9.x = v.x;
        this._topLeftPatch9.y = v.y;
    }
    get bottomRightPatch9 () {
        return this._bottomRightPatch9;
    }
    set bottomRightPatch9 (v: Vec2) {
        this._bottomRightPatch9.x = v.x;
        this._bottomRightPatch9.y = v.y;
    }
}
