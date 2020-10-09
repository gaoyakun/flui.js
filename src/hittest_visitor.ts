import { Visitor, visitor } from './misc';
import { RMLNode, ElementHittestEvent, Vec2 } from '.';

export class GUIHitTestVisitor extends Visitor {
    private _x: number;
    private _y: number;
    private _hits: { element:RMLNode, x:number, y:number }[];
    constructor (x: number, y: number) {
        super ();
        this._x = x;
        this._y = y;
        this._hits = [];
    }
    getHits (): { element:RMLNode, x:number, y:number }[] {
        return this._hits;
    }
    @visitor(RMLNode)
    visitElement (w: RMLNode) {
        if (w._isVisible() && !w._isText()) {
            const v = w.toAbsolute ({ x:0, y:0 });
            let x = this._x - v.x;
            let y = this._y - v.y;
            const rc = w.getClippedRect();
            const cx1 = rc ? rc.x : 0;
            const cy1 = rc ? rc.y : 0;
            const cx2 = rc ? rc.x + rc.width : w.getRect().width;
            const cy2 = rc ? rc.y + rc.height : w.getRect().height;
            if (x >= cx1 && x < cx2 && y >= cy1 && y < cy2) {
                const hittestEvent = new ElementHittestEvent (x, y);
                w.dispatchEvent (hittestEvent);
                if (hittestEvent.allow) {
                    this._hits.push ({
                        element: w,
                        x: x,
                        y: y
                    });
                }
            }
        }
    }
}

