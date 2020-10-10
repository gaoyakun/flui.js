import { RMLRectPrimitive, RMLElement, GUI, tagname, AttributeChangeEvent, IStyleSheet, Event, GUIMouseEvent, ValueChangeEvent, ElementLayoutEvent, UIRect, Vec4 } from '..';

@tagname ('slider')
export class Slider extends RMLElement<Slider> {
    /** @internal */
    protected _blockRect: UIRect;
    /** @internal */
    protected _lastX: number;
    /** @internal */
    protected _lastY: number;
    /** @internal */
    protected _lastRectX: number;
    /** @internal */
    protected _lastRectY: number;
    /** @internal */
    protected _blockPos: number;
    /** @internal */
    protected _draggingBlock: boolean;
    /** @internal */
    protected _blockColor: Vec4;
    constructor (uiscene: GUI) {
        super (uiscene);
        this._blockRect = null;
        this._lastX = 0;
        this._lastY = 0;
        this._lastRectX = 0;
        this._lastRectY = 0;
        this._draggingBlock = false;
        this._blockPos = 0;
        this._blockColor = this.style.parseColor ('#555555');
        this.addEventListener (GUIMouseEvent.NAME_MOUSEDOWN, function (this: Slider, evt:Event) {
            const data: GUIMouseEvent = evt as GUIMouseEvent;
            if (data.button === 1 // left button 
                && !this._draggingBlock 
                && this._blockRect 
                && data.x >= this._blockRect.x 
                && data.y >= this._blockRect.y 
                && data.x < this._blockRect.x + this._blockRect.width 
                && data.y < this._blockRect.y + this._blockRect.height) {
                this.setCapture ();
                this._lastX = data.x;
                this._lastY = data.y;
                this._lastRectX = this._blockRect.x;
                this._lastRectY = this._blockRect.y;
                this._draggingBlock = true;
            }
        });
        this.addEventListener (GUIMouseEvent.NAME_MOUSEUP, function (this: Slider, evt: Event) {
            const data: GUIMouseEvent = evt as GUIMouseEvent;
            if (data.button === 1 && this._draggingBlock) {
                this.releaseCapture ();
                this._draggingBlock = false;
            }
        });
        this.addEventListener (GUIMouseEvent.NAME_MOUSEMOVE, function (this: Slider, evt: Event) {
            const data: GUIMouseEvent = evt as GUIMouseEvent;
            if (this._draggingBlock && this._blockRect) {
                const isVertical = this.orientation === 'vertical';
                const clientRect = this.getClientRect ();
                const mx = data.x;
                const my = data.y;
                let ratio: number;
                if (isVertical) {
                    const freeSpace = clientRect.height - this.blockSize;
                    this._blockRect.y = Math.max (clientRect.y, Math.min (clientRect.y + freeSpace, this._lastRectY + my - this._lastY));
                    ratio = (this._blockRect.y - clientRect.y) / freeSpace;
                } else {
                    const freeSpace = clientRect.width - this.blockSize;
                    this._blockRect.x = Math.max (clientRect.x, Math.min (clientRect.x + freeSpace, this._lastRectX + mx - this._lastX));
                    ratio = (this._blockRect.x - clientRect.x) / freeSpace;
                }
                this.value = Math.floor (this.rangeStart + (this.rangeEnd - this.rangeStart) * ratio);
                const blockPos = isVertical ? this._blockRect.y - clientRect.y : this._blockRect.x - clientRect.x;
                if (blockPos !== this._blockPos) {
                    this._blockPos = blockPos;
                    this._invalidateContent ();
                }
            }
        });
        this.addEventListener (ElementLayoutEvent.NAME, (evt: Event) => {
            this._blockPos = this._computeBlockPos ();
        });
        this.addEventListener (AttributeChangeEvent.NAME, (evt: Event) => {
            const data: AttributeChangeEvent = evt as AttributeChangeEvent;
            this._onAttributeChange (data.name);
        });
    }
    get value (): number {
        return this._getNumberAttribute ('value', 0);
    }
    set value (val: number) {
        const oldVal = this.value;
        this._setNumberAttribute ('value', val);
        val = Math.max (this.rangeStart, Math.min(this.rangeEnd, this.value));
        if (this.value !== oldVal) {
            this._blockPos = this._computeBlockPos ();
            this._invalidateContent ();
            this.dispatchEvent (new ValueChangeEvent(this.value));
        }
    }
    get rangeStart (): number {
        return this._getNumberAttribute ('rangeStart', 0);
    }
    set rangeStart (val: number) {
        this._setNumberAttribute ('rangeStart', val);
    }
    get rangeEnd (): number {
        return this._getNumberAttribute ('rangeEnd', 100);
    }
    set rangeEnd (val: number) {
        this._setNumberAttribute ('rangeEnd', val);
    }
    get blockSize (): number {
        return this._getNumberAttribute ('blockSize', 8);
    }
    set blockSize (val: number) {
        this._setNumberAttribute ('blockSize', val);
    }
    get stepValue (): number {
        return this._getNumberAttribute ('stepValue', 1);
    }
    set stepValue (val: number) {
        this._setNumberAttribute ('stepValue', val);
    }
    get pageValue (): number {
        return this._getNumberAttribute ('pageValue', 10);
    }
    set pageValue (val: number) {
        this._setNumberAttribute ('pageValue', val);
    }
    get orientation (): string {
        return this._getStringAttribute ('orientation', 'vertical');
    }
    set orientation (val: string) {
        this._setStringAttribute ('orientation', val);
    }
    get blockColor (): string {
        return this._getStringAttribute ('blockColor', '#555555');
    }
    set blockColor (val: string) {
        this._setStringAttribute ('blockColor', val);
        this._blockColor = this.style.parseColor (this.blockColor) || this.style.parseColor ('#555555');
        this._invalidateContent ();
    }
    get blockImage (): string {
        return this._getStringAttribute ('blockImage', '');
    }
    set blockImage (val: string) {
        this._setStringAttribute ('blockImage', val);
        this._invalidateContent ();
    }
    /** @internal */
    protected _onAttributeChange (name: string) {
        if (name === 'rangeStart' || name === 'rangeEnd') {
            this._blockPos = this._computeBlockPos ();
            this._invalidateContent ();
        }
    }
    /** @internal */
    protected _buildBlockVertexData () {
        const clipper = this._getClipper (false);
        if (clipper) {
            const blockColor = this._blockColor;
            const blockImage = this.blockImage ? this._uiscene.imageManager.getImage(this.blockImage) : null;
            const uvMin = blockImage?.uvMin || null;
            const uvMax = blockImage?.uvMax || null;
            this._batchList.addPrimitive (new RMLRectPrimitive(
                this._blockRect.x, 
                this._blockRect.y, 
                this._blockRect.width, 
                this._blockRect.height, 
                uvMin?.x || 0,
                uvMin?.y || 0,
                uvMax?.x || 0,
                uvMax?.y || 0),
            clipper,
            blockImage?.texture || null,
            blockColor);
        }
    }
    /** @internal */
    protected _computeBlockPos () {
        const isVertical = this.orientation === 'vertical';
        const rangeMin = this.rangeStart < this.rangeEnd ? this.rangeStart : this.rangeEnd;
        const rangeMax = this.rangeStart < this.rangeEnd ? this.rangeEnd : this.rangeStart;
        const value = Math.max (Math.min (this.value, rangeMax), rangeMin);
        const clientRect = this._layout.clientRect;
        const freeSpace = (isVertical ? clientRect.height : clientRect.width) - this.blockSize;
        if (freeSpace < 0) {
            return -1;
        }
        return Math.floor(freeSpace * (value - this.rangeStart) / (this.rangeEnd - this.rangeStart));
    }
    /** @internal */
    protected _buildVertexData () {
        super._buildVertexData ();
        if (this.rangeStart === this.rangeEnd) {
            this._blockRect = null;
            return;
        }
        const blockSize = Math.floor (this.blockSize);
        if (blockSize <= 0) {
            this._blockRect = null;
            return;
        }
        const isVertical = this.orientation === 'vertical';
        const clientRect = this.getClientRect ();
        const freeSpace = (isVertical ? clientRect.height : clientRect.width) - this.blockSize;
        if (freeSpace < 0) {
            this._blockRect = null;
            return;
        }
        this._blockRect = {
            x: isVertical ? clientRect.x : clientRect.x + this._blockPos,
            y: isVertical ? clientRect.y + this._blockPos : clientRect.y,
            width: isVertical ? clientRect.width : blockSize,
            height: isVertical ? blockSize : clientRect.height
        };
        this._buildBlockVertexData ();
    }
    /** @internal */
    _init (): void {
    }
    /** @internal */
    _getDefaultStyleSheet (): IStyleSheet {
        const style = super._getDefaultStyleSheet ();
        style.padding = '0';
        style.backgroundColor = '#ffffff';
        return style;
    }
}