import { GUI, tagname, Button, Slider, IStyleSheet, Event, GUIMouseEvent } from '..';

@tagname ('scrollbar')
export class ScrollBar extends Slider {
    private _buttonUp: Button;
    private _buttonDown: Button;
    constructor (uiscene: GUI) {
        super (uiscene);
        this._buttonUp = new Button (uiscene);
        this._buttonUp._setInternal ();
        this.appendChild (this._buttonUp);
        this._buttonUp.addEventListener (GUIMouseEvent.NAME_MOUSECLICK, () => {
            this.value -= this.stepValue;
        });
        this._buttonDown = new Button (uiscene);
        this._buttonDown._setInternal ();
        this.appendChild (this._buttonDown);
        this._buttonDown.addEventListener (GUIMouseEvent.NAME_MOUSECLICK, () => {
            this.value += this.stepValue;
        });
        this._updateOrientationStyle ();
    }
    get buttonSize (): number {
        return this._getNumberAttribute ('buttonSize', 8);
    }
    set buttonSize (val: number) {
        this._setNumberAttribute ('buttonSize', val);
    }
    /** @internal */
    _init (): void {
    }
    /** @internal */
    _getDefaultStyleSheet (): IStyleSheet {
        const style = super._getDefaultStyleSheet ();
        style.overflow = 'visible';
        if (this.orientation === 'vertical') {
            style.paddingTop = String(this.buttonSize);
            style.paddingBottom = String(this.buttonSize);
        } else {
            style.paddingLeft = String(this.buttonSize);
            style.paddingRight = String(this.buttonSize);
        }
        return style;
    }
    protected _onAttributeChange (name: string) {
        super._onAttributeChange (name);
        if (name === 'rangeStart' || name === 'rangeEnd') {
            this._invalidateLayout ();
        } else if (name === 'buttonSize' || name === 'orientation') {
            if (name === 'orientation') {
                this._updateOrientationStyle ();
            }
            this._invalidateLayout ();
        }
}
    protected _updateScrollState (): void {
    }
    private _updateOrientationStyle () {
        const vertical = this.orientation === 'vertical';
        this._buttonUp.setAttribute ('style', vertical 
            ? `position:absolute;left:0;right:0;top:0;height:${this.buttonSize};background-image:default.scrollbar.up` 
            : `position:absolute;left:0;top:0;bottom:0;width:${this.buttonSize};background-image:default.scrollbar.left`);
        this._buttonDown.setAttribute ('style', vertical 
            ? `position:absolute;left:0;right:0;bottom:0;height:${this.buttonSize};background-image:default.scrollbar.down;` 
            : `position:absolute;right:0;top:0;bottom:0;width:${this.buttonSize};background-image:default.scrollbar.right`);
        this._invalidateLayout ();
        this._uiscene._markStyleRefreshForElement (this);
    }
}