import { Viewer, AbstractTexture, BlendFunc, FaceMode, WebGLEnum, PrimitiveType, AbstractProgram, DataType, BufferUsage, dataTypeToSize, BlendEquation } from '../device';
import { visitor, Visitor, Primitive, StandardMaterial, Camera, ShaderConstants } from '../scene';
import { RMLNode, GUI, RMLPrimitiveBatchList } from '.';
import { Vector4, Matrix4x4, Vector3 } from '../math';
import { disposable, Disposable } from '../defs';

class GUIDrawVisitor extends Visitor {
    private _guiRenderer: GUIRenderer;
    constructor (guiRenderer: GUIRenderer) {
        super ();
        this._guiRenderer = guiRenderer;
    }
    @visitor(RMLNode)
    visitElement (w: RMLNode) {
        if (w._isVisible()) {
            w.draw (this._guiRenderer);
        }
    }
}

export interface GUIRenderer extends Disposable<GUIRenderer> {}

@disposable()
export class GUIRenderer {
    private static readonly VAO_BUFFER_SIZE = 8192;
    private _viewer: Viewer;
    private _drawVisitor: GUIDrawVisitor;
    private _primitiveBuffer: Primitive[];
    private _activeBuffer: number;
    private _drawPosition: number;
    private _drawCount: number;
    private _currentTexture: AbstractTexture;
    private _material: StandardMaterial;
    private _vertexCache: Float32Array;
    private _camera: Camera;
    private _flipMatrix: Matrix4x4;
    constructor (viewer: Viewer, bounds?: Vector4) {
        this._viewer = viewer;
        this._drawVisitor = new GUIDrawVisitor (this);
        this._camera = new Camera (null, null, Matrix4x4.ortho (0, this._viewer.drawingBufferWidth, 0, this._viewer.drawingBufferHeight, 1, 100)).retain();
        this._flipMatrix = Matrix4x4.translation(new Vector3(0, this._viewer.drawingBufferHeight, 0)).scaleRight(new Vector3(1, -1, 1));
        this._material = new StandardMaterial (viewer).retain ();
        this._material.enableLighting (false).enableSRGBOutput (false);
        this._material.stateSet.useBlendingState()
            .enable(true)
            .funcRGB (BlendFunc.SRC_ALPHA, BlendFunc.INV_SRC_ALPHA)
            .funcAlpha (BlendFunc.ONE, BlendFunc.ZERO)
            .equation (BlendEquation.ADD, viewer.supportBlendMinMax ? BlendEquation.ADD : BlendEquation.ADD);
        this._material.stateSet.useDepthState().enableTest(false).enableWrite(false);
        this._material.stateSet.useRasterizerState().cull(FaceMode.NONE);
        this._primitiveBuffer = [new Primitive (viewer).retain (), new Primitive (viewer).retain ()];
        this._activeBuffer = 0;
        const indexArray: number[] = Array.from ({length: GUIRenderer.VAO_BUFFER_SIZE * 6});
        for (let i = 0; i < GUIRenderer.VAO_BUFFER_SIZE; i++) {
            const base = i * 4;
            indexArray[i * 6 + 0] = base + 0;
            indexArray[i * 6 + 1] = base + 1;
            indexArray[i * 6 + 2] = base + 2;
            indexArray[i * 6 + 3]  = base + 0;
            indexArray[i * 6 + 4] = base + 2;
            indexArray[i * 6 + 5] = base + 3;
        }
        for (let i = 0; i < 2; i++) {
            this._primitiveBuffer[i].setIndexBuffer (indexArray);
            this._primitiveBuffer[i].primitiveType = PrimitiveType.TriangleList;
            this._primitiveBuffer[i].setInterleavedVertexBuffer ({
                [Primitive.SEMANTIC_POSITION]: 0,
                [Primitive.SEMANTIC_DIFFUSE]: 3 * dataTypeToSize(DataType.F32),
                [Primitive.SEMANTIC_TEXCOORD]: 7 * dataTypeToSize(DataType.F32)
            }, {
                usage: BufferUsage.Dynamic,
                elementType: DataType.F32,
                elementCount: 9,
                data: dataTypeToSize(DataType.F32) * 9 * 4 * GUIRenderer.VAO_BUFFER_SIZE
            });
        }
        this._drawPosition = 0;
        this._drawCount = 0;
        this._currentTexture = null;
        this._vertexCache = new Float32Array(9 * 4 * GUIRenderer.VAO_BUFFER_SIZE);
    }
    dispose () {
        this._camera?.release ();
        this._camera = null;
        this._material?.release ();
        this._material = null;
        this._primitiveBuffer[0].release ();
        this._primitiveBuffer[1].release ();
        this._primitiveBuffer = null;
        this._vertexCache = null;
        this._viewer = null;
    }
    drawBatchList (batches: RMLPrimitiveBatchList) {
        for (let i = 0; i < batches.length; i++) {
            const batch = batches.getBatch (i);
            const vertices = batches.getVertices (i);
            const color = batch.color;
            if (color.w > 0 && vertices) {
                this.drawQuads (vertices, batch.texture || null);
            }
        }
    }
    drawQuads (data: Float32Array, texture: AbstractTexture) {
        let tex = texture || null;
        if (tex && !tex.isLoaded()) {
            tex = null;
        }
        if (tex !== this._currentTexture || this._drawPosition + this._drawCount === GUIRenderer.VAO_BUFFER_SIZE) {
            this.flush ();            
            this._currentTexture = tex;
        }
        let updatePosition = this._drawPosition + this._drawCount;
        let count = data.length / 36;
        let pos = 0;
        while (updatePosition < GUIRenderer.VAO_BUFFER_SIZE && count > 0) {
            const drawCount = Math.min (count, GUIRenderer.VAO_BUFFER_SIZE - updatePosition);
            const subdata = pos === 0 && drawCount === count ? data : data.subarray (pos, pos + drawCount * 36);
            this._vertexCache.set (subdata, updatePosition * 36);
            this._drawCount += drawCount;
            pos += drawCount * 36;
            updatePosition += drawCount;
            count -= drawCount;
            if (updatePosition === GUIRenderer.VAO_BUFFER_SIZE) {
                this.flush ();
                updatePosition = this._drawPosition + this._drawCount;
            }
        }
    }
    drawQuad (x1: number, y1: number, x2: number, y2: number, u1: number, v1: number, u2: number, v2: number, color: Vector4, texture: AbstractTexture) {
        let tex = texture || null;
        if (tex && !tex.isLoaded()) {
            tex = null;
        }
        if (tex !== this._currentTexture || this._drawPosition + this._drawCount === GUIRenderer.VAO_BUFFER_SIZE) {
            this.flush ();            
            this._currentTexture = tex;
        }
        const updatePosition = this._drawPosition + this._drawCount;
        const pcache = this._vertexCache;
        let p = updatePosition * 4 * 9;

        pcache[p++] = x1;
        pcache[p++] = y1;
        pcache[p++] = -50;
        pcache[p++] = color.x;
        pcache[p++] = color.y;
        pcache[p++] = color.z;
        pcache[p++] = color.w;
        pcache[p++] = u1;
        pcache[p++] = v1;

        pcache[p++] = x2;
        pcache[p++] = y1;
        pcache[p++] = -50;
        pcache[p++] = color.x;
        pcache[p++] = color.y;
        pcache[p++] = color.z;
        pcache[p++] = color.w;
        pcache[p++] = u2;
        pcache[p++] = v1;

        pcache[p++] = x2;
        pcache[p++] = y2;
        pcache[p++] = -50;
        pcache[p++] = color.x;
        pcache[p++] = color.y;
        pcache[p++] = color.z;
        pcache[p++] = color.w;
        pcache[p++] = u2;
        pcache[p++] = v2;

        pcache[p++] = x1;
        pcache[p++] = y2;
        pcache[p++] = -50;
        pcache[p++] = color.x;
        pcache[p++] = color.y;
        pcache[p++] = color.z;
        pcache[p++] = color.w;
        pcache[p++] = u1;
        pcache[p++] = v2;

        this._drawCount++;
    }
    flush () {
        if (this._drawCount > 0) {
            const buffer = this._primitiveBuffer[this._activeBuffer];
            buffer.getVertexBuffer (Primitive.SEMANTIC_POSITION).updateData ({ 
                source: this._vertexCache, 
                offset: this._drawPosition * 36, 
                length: this._drawCount * 36 
            }, this._drawPosition * 36 * dataTypeToSize(DataType.F32));
            buffer.drawOffset = this._drawPosition * 4;
            this._material.setDiffuseMap (this._currentTexture);
            let program: AbstractProgram;
            if (program = this._material.beginDraw (this._camera, [], buffer.layout)) {
                program.setUniform (ShaderConstants.UNIFORM_WORLD_MATRIX, this._flipMatrix/*Matrix4x4.identity()*/);
                buffer.indexStart = 0; // this._drawPosition * indicesPerQuad;
                buffer.indexCount = this._drawCount * 6;
                buffer.draw ()
                this._material.endDraw (program)
            }
            if (this._drawPosition + this._drawCount === GUIRenderer.VAO_BUFFER_SIZE) {
                this._activeBuffer = 1 - this._activeBuffer;
                this._drawPosition = 0;
            } else {
                this._drawPosition += this._drawCount;
            }
            this._drawCount = 0;
        }
    }
    render (ui: GUI) {
        if (ui) {
            ui.checkAndRefreshStyle ();
            ui.updateLayout ();
            const oldViewport = this._viewer.context.getParameter(WebGLEnum.VIEWPORT);
            this._viewer.context.viewport (0, 0, this._viewer.drawingBufferWidth, this._viewer.drawingBufferHeight);
            this._camera.projectionMatrix.ortho (0, this._viewer.drawingBufferWidth, 0, this._viewer.drawingBufferHeight, 1, 100);
            this._flipMatrix = Matrix4x4.translation(new Vector3(0, this._viewer.drawingBufferHeight, 0)).scaleRight(new Vector3(1, -1, 1));
            this._viewer.clear (true, true, true);
            ui.document.traverse (this._drawVisitor, false, true);
            this.flush ();
            this._viewer.context.viewport (oldViewport[0], oldViewport[1], oldViewport[2], oldViewport[3]);
        }
    }
}