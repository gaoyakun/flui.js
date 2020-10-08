import { RMLElement, GUI, tagname, GUIRenderer } from '..'
import { Vector2 } from '../../math';
import { Scene, Camera } from '../../scene'

@tagname ('sceneview')
export class SceneView extends RMLElement<SceneView> {
    private _scene: Scene;
    private _camera: Camera;
    private _autoCamera: Camera;
    constructor (uiscene: GUI) {
        super (uiscene);
        this._scene = new Scene (this._uiscene.viewer).retain();
        this._camera = null;
        this._autoCamera = null;
    }
    get scene () {
        return this._scene;
    }
    get camera () {
        return this._camera;
    }
    set camera (camera: Camera) {
        camera?.retain ();
        this._camera?.release ();
        this._camera = camera;
    }
    protected _draw (renderer: GUIRenderer) {
        super._draw (renderer);
        renderer.flush ();
        const gl = this._uiscene.viewer.context;
        const vp: Int32Array = gl.getParameter (gl.VIEWPORT);
        const height = vp[3];
        const scissor: Int32Array = gl.getParameter (gl.SCISSOR_BOX);
        const scissorEnabled = gl.isEnabled (gl.SCISSOR_TEST);
        const rect = this.getClientRect ();
        const pos = this.toAbsolute (Vector2.zero());
        const posClient = new Vector2(pos.x + rect.x, pos.y + rect.y);
        let x = posClient.x;
        let y = height - posClient.y - rect.height;
        let w = rect.width;
        let h = rect.height;
        gl.viewport (x, y, w, h);
        let cliprect = this.getClippedRect () || rect;
        if (cliprect) {
            x = cliprect.x + pos.x;
            y = height - cliprect.y - pos.y - cliprect.height;
        }
        gl.scissor (x, y, cliprect.width, cliprect.height);
        gl.enable (gl.SCISSOR_TEST);
        let camera = this._camera;
        if (!camera) {
            this._autoCamera = this._scene.addCamera ().retain();
            camera = this._autoCamera;
        }
        camera.render ();
        gl.scissor (scissor[0], scissor[1], scissor[2], scissor[3]);
        gl.viewport (vp[0], vp[1], vp[2], vp[3]);
        scissorEnabled ? gl.enable (gl.SCISSOR_TEST) : gl.disable (gl.SCISSOR_TEST);
    }
}
