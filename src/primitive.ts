import { UIRect, Vec4, Texture } from '.';

export abstract class RMLPrimitive {
    abstract forEach (callback: (x: number, y: number, u: number, v: number) => void, thisArg?: any);
    abstract clipToRect (x: number, y: number, w: number, h: number): RMLPrimitive;
}

type Vertex = { x: number, y: number, u?: number, v?: number };
export class RMLPolygonPrimitive extends RMLPrimitive {
    private _vertices: Vertex[];
    constructor (vertices?: Vertex[]) {
        super ();
        this._vertices = vertices || [];
    }
    get vertices () {
        return this._vertices;
    }
    set vertices (v) {
        this._vertices = v || [];
    }
    forEach (callback: (x: number, y: number, u: number, v: number) => void, thisArg?: any) {
        const indices: number[] = [];
        if (this._vertices.length > 2) {
            const numQuads = Math.ceil((this._vertices.length - 2) / 2);
            for (let i = 0; i < numQuads; i++) {
                indices.push (0);
                indices.push (i * 2 + 1);
                indices.push (i * 2 + 2);
                indices.push (Math.min(this._vertices.length - 1, i * 2 + 3));
            }
        }
        for (let i = 0; i < indices.length; i++) {
            const v = this._vertices[indices[i]];
            callback.call (thisArg, v.x, v.y, v.u||0, v.v||0);
        }
    }
    clipToRect (x: number, y: number, w: number, h: number): RMLPrimitive {
        if (this._vertices.length < 3) {
            return null;
        }
        // use Sutherland Hodgeman algorithm
        const pingpong: Vertex[][] = [[], []];
        let current = 0;
        pingpong[current] = [...this._vertices];
        const classify: ((v: Vertex)=>boolean)[] = [
            (v: Vertex): boolean => v.x >= x, // left
            (v: Vertex): boolean => v.x <= x + w, // right
            (v: Vertex): boolean => v.y >= y, // top
            (v: Vertex): boolean => v.y <= y + h // bottom
        ];
        const intersect: ((v1: Vertex, v2: Vertex) => Vertex)[] = [
            (v1: Vertex, v2: Vertex): Vertex => this._interpolateVertex(v1, v2, (x - v1.x) / (v2.x - v1.x)), // left
            (v1: Vertex, v2: Vertex): Vertex => this._interpolateVertex(v1, v2, (x + w - v1.x) / (v2.x - v1.x)), // right
            (v1: Vertex, v2: Vertex): Vertex => this._interpolateVertex(v1, v2, (y - v1.y) / (v2.y - v1.y)), // top
            (v1: Vertex, v2: Vertex): Vertex => this._interpolateVertex(v1, v2, (y + h - v1.y) / (v2.y - v1.y)), // bottom
        ];
        for (let pass = 0; pass < 4; pass++) {
            const fnClassify = classify[pass];
            const fnIntersect = intersect[pass];
            const src = pingpong[current];
            const dest = pingpong[1 - current];
            dest.length = 0;
            for (let i = 0; i < src.length; i++) {
                const j = (i + 1) % src.length;
                const firstIn = fnClassify(src[i]);
                const secondIn = fnClassify(src[j]);
                if (firstIn) {
                    if (secondIn) {
                        dest.push (src[j]);
                    } else {
                        dest.push (fnIntersect(src[i], src[j]));
                    }
                } else if (secondIn) {
                    dest.push (fnIntersect(src[i], src[j]), src[j]);
                }
            }
            current = 1 - current;
        }
        if (pingpong[current].length === 0) {
            return null;
        }
        const ret = new RMLPolygonPrimitive ();
        ret.vertices = pingpong[current];
        return ret;
    }
    private _interpolateVertex (v1: Vertex, v2: Vertex, factor: number): Vertex {
        const s1 = v1.u || 0;
        const t1 = v1.v || 0;
        const s2 = v2.u || 0;
        const t2 = v2.v || 0;
        return {
            x: Math.round(v1.x + (v2.x - v1.x) * factor),
            y: Math.round(v1.y + (v2.y - v1.y) * factor),
            u: s1 + (s2 - s1) * factor,
            v: t1 + (t2 - t1) * factor
        };
    }
}

export class RMLRectPrimitive extends RMLPrimitive{
    private _x1: number;
    private _y1: number;
    private _x2: number;
    private _y2: number;
    private _u1: number;
    private _v1: number;
    private _u2: number;
    private _v2: number;
    constructor (x: number, y: number, w: number, h: number, uMin: number, vMin: number, uMax: number, vMax: number) {
        super ();
        this._x1 = x;
        this._y1 = y;
        this._x2 = x + w;
        this._y2 = y + h;
        this._u1 = uMin;
        this._v1 = vMin;
        this._u2 = uMax;
        this._v2 = vMax;
    }
    forEach (callback: (x: number, y: number, u: number, v: number) => void, thisArg?: any) {
        const x = [this._x1, this._x2, this._x2, this._x1];
        const y = [this._y1, this._y1, this._y2, this._y2];
        const u = [this._u1, this._u2, this._u2, this._u1];
        const v = [this._v1, this._v1, this._v2, this._v2];
        for (let i = 0; i < 4; i++) {
            callback.call (thisArg, x[i], y[i], u[i], v[i]);
        }
    }
    clipToRect (x: number, y: number, w: number, h: number): RMLPrimitive {
        const x1 = Math.max (x, this._x1);
        const y1 = Math.max (y, this._y1);
        const x2 = Math.min (x + w, this._x2);
        const y2 = Math.min (y + h, this._y2);
        if (x1 >= x2 || y1 >= y2) {
            return null;
        }
        const du = this._u2 - this._u1;
        const dv = this._v2 - this._v1;
        const dw = this._x2 - this._x1;
        const dh = this._y2 - this._y1;
        const u1 = this._u1 + du * (x1 - this._x1) / dw;
        const v1 = this._v1 + dv * (y1 - this._y1) / dh;
        const u2 = this._u2 - du * (this._x2 - x2) / dw;
        const v2 = this._v2 - dv * (this._y2 - y2) / dh;

        return new RMLRectPrimitive (x1, y1, x2 - x1, y2 - y1, u1, v1, u2, v2);
    }
}

export class RMLPrimitiveBatchList {
    private _batchList: { batch:RMLPrimitiveBatch, vertices: Float32Array }[];
    private _absoluteX: number;
    private _absoluteY: number;
    private _needUpdate: boolean;
    constructor (x: number, y: number) {
        this._absoluteX = x;
        this._absoluteY = y;
        this.clear ();
    }
    get length (): number {
        return this._batchList.length;
    }
    get x (): number {
        return this._absoluteX;
    }
    set x (val: number) {
        if (this._absoluteX !== val) {
            this._absoluteX = val;
            this._needUpdate = true;
        }
    }
    get y (): number {
        return this._absoluteY;
    }
    set y (val: number) {
        if (this._absoluteY !== val) {
            this._absoluteY = val;
            this._needUpdate = true;
        }
    }
    clear () {
        this._batchList = [];
        this._needUpdate = false;
    }
    getBatch (index: number): RMLPrimitiveBatch {
        return this._batchList[index]?.batch || null;
    }
    getVertices (index: number): Float32Array {
        if (this._needUpdate) {
            this._needUpdate = false;
            this._updateVertices ();
        }
        return this._batchList[index]?.vertices || null;
    }
    addBatch (batch: RMLPrimitiveBatch) {
        if (batch) {
            const lastBatch = this._batchList[this._batchList.length - 1].batch || null;
            if (!lastBatch 
                || lastBatch.texture !== batch.texture 
                || lastBatch.color.x !== batch.color.x 
                || lastBatch.color.y !== batch.color.y 
                || lastBatch.color.z !== batch.color.z 
                || lastBatch.color.w !== batch.color.w) {
                this._batchList.push ({ batch:batch, vertices: null });
            } else {
                for (let i = 0; i < batch.length; i++) {
                    lastBatch.addPrimitive (batch.getPrimitive (i));
                }
            }
            this._needUpdate = true;
        }
    }
    addPrimitive (prim: RMLPrimitive, clipper: UIRect, tex?: Texture, color?: Vec4) {
        if (prim && clipper) {
            tex = tex || null;
            color = color || { x:1, y:1, z:1, w:1 };
            if (color.w > 0) {
                let lastBatch = this._batchList[this._batchList.length-1]?.batch || null;
                if (!lastBatch 
                    || lastBatch.texture !== tex 
                    || lastBatch.color.x !== color.x
                    || lastBatch.color.y !== color.y
                    || lastBatch.color.z !== color.z
                    || lastBatch.color.w !== color.w
                    || !lastBatch.isSameClipper(clipper)) {
                    lastBatch = new RMLPrimitiveBatch (clipper);
                    lastBatch.texture = tex;
                    lastBatch.color = color;
                    this._batchList.push ({batch: lastBatch, vertices: null});
                }
                lastBatch.addPrimitive (prim);
                this._needUpdate = true;
            }
        }
    }
    private _updateVertices () {
        for (const batch of this._batchList) {
            let verts: number[] = [];
            for (let prim = 0; prim < batch.batch.length; prim++) {
                let primitive = batch.batch.getPrimitive(prim);
                const color = batch.batch.color;
                primitive.forEach ((x, y, u, v) => {
                    verts.push (x + this._absoluteX, y + this._absoluteY, -50, color.x, color.y, color.z, color.w, u, v);
                });
            }
            batch.vertices = new Float32Array (verts);
        }
    }
}

export class RMLPrimitiveBatch {
    private _clippedRect: UIRect;
    private _tex: Texture;
    private _color: Vec4;
    private _primitives: RMLPrimitive[];
    constructor (clipper: UIRect) {
        if (!clipper) {
            throw new Error('Failed to construct RMLPrimitiveBatch: clipper must not be null');
        }
        this._clippedRect = clipper;
        this._tex = null;
        this._color = { x:1, y:1, z:1, w:1 };
        this._primitives = [];
    }
    get texture (): Texture {
        return this._tex;
    }
    set texture (tex: Texture) {
        this._tex = tex;
    }
    get color (): Vec4 {
        return this._color;
    }
    set color (clr: Vec4) {
        clr = clr || { x:1, y:1, z:1, w:1 };
        this._color.x = clr.x;
        this._color.y = clr.y;
        this._color.z = clr.z;
        this._color.w = clr.w;
    }
    get length (): number {
        return this._primitives.length;
    }
    getPrimitive (index: number): RMLPrimitive {
        return this._primitives[index] || null;
    }
    addPrimitive (prim: RMLPrimitive) {
        if (prim && this._primitives.indexOf(prim) < 0) {
            if (this._clippedRect) {
                prim = prim.clipToRect (this._clippedRect.x, this._clippedRect.y, this._clippedRect.width, this._clippedRect.height);
            }
            if (prim) {
                this._primitives.push (prim);
            }
        }
    }
    setClipper (rect: UIRect) {
        this._clippedRect = rect ? {...rect} : null;
    }
    isSameClipper (rc: UIRect) {
        return rc.x !== this._clippedRect.x || rc.y !== this._clippedRect.y || rc.width !== this._clippedRect.width || rc.height !== this._clippedRect.height;
    }
    clear () {
        this._primitives.length = 0;
    }
}