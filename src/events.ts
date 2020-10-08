import { MouseButton, BaseMouseEvent, Key, BaseKeyEvent } from '../device';
import { RMLNode, RMLElement, RMLPrimitiveBatchList } from '.';

export class GUIEvent {
    target: RMLNode;
    propagate: boolean;
    default: boolean;
    constructor (target: RMLNode) {
        this.target = target;
        this.propagate = true;
        this.default = true;
    }
    stopPropagation () {
        this.propagate = false;
    }
    preventDefault () {
        this.default = false;
    }
}

export class GUIMouseEvent extends GUIEvent {
    static readonly NAME_MOUSEDOWN = 'mouseDown';
    static readonly NAME_MOUSEUP = 'mouseUp';
    static readonly NAME_MOUSEMOVE = 'mouseMove';
    static readonly NAME_MOUSECLICK = 'mouseClick';
    static readonly NAME_MOUSEDBLCLICK = 'mouseDblClick';
    static readonly NAME_MOUSEENTER = 'mouseEnter';
    static readonly NAME_MOUSELEAVE = 'mouseLeave';
    static readonly NAME_MOUSEIN = 'mouseIn';
    static readonly NAME_MOUSEOUT = 'mouseOut';
    x: number;
    y: number;
    button: MouseButton;
    keymod: number;
    constructor (target: RMLNode, x: number, y: number, evt: BaseMouseEvent) {
        super (target);
        this.target = target;
        this.x = x;
        this.y = y;
        this.button = evt.button;
        this.keymod = evt.keymod;
    }
}

export class GUIKeyEvent extends GUIEvent {
    static readonly NAME_KEYDOWN = 'keyDown';
    static readonly NAME_KEYUP = 'keyUp';
    static readonly NAME_KEYPRESS = 'keyPress';
    key: Key;
    name: string;
    charCode: number;
    repeat: boolean;
    keymod: number;
    constructor (target: RMLNode, evt: BaseKeyEvent) {
        super (target);
        this.key = evt.key;
        this.name = evt.name;
        this.charCode = evt.charCode;
        this.repeat = evt.repeat;
        this.keymod = evt.keymod;
    }
}

export class GUIFocusEvent extends GUIEvent {
    static readonly NAME_FOCUS = 'focus';
    static readonly NAME_BLUR = 'blur';
    constructor (target: RMLNode) {
        super (target);
    }
}

export class ElementLayoutEvent extends GUIEvent {
    static readonly NAME = 'layout';
    constructor (target: RMLNode) {
        super (target);
    }
}

export class ElementBuildContentEvent extends GUIEvent {
    static readonly NAME_PREBUILD = 'prebuildcontent';
    static readonly NAME_POSTBUILD = 'postbuildcontent';
    batchList: RMLPrimitiveBatchList;
    constructor (target: RMLNode, batchList: RMLPrimitiveBatchList) {
        super (target);
        this.batchList = batchList;
    }
}

export class ElementHittestEvent extends GUIEvent {
    static readonly NAME = 'hittest';
    x: number;
    y: number;
    allow: boolean;
    constructor (target: RMLNode, x: number, y: number) {
        super (target);
        this.x = x;
        this.y = y;
        this.allow = true;
    }
}

export class TextEvent extends GUIEvent {
    static readonly NAME_CONTENT_CHANGE = 'textContentChange';
    static readonly NAME_FONT_CHANGE = 'textFontChange';
    constructor (target: RMLNode) {
        super (target);
    }
}

export class ValueChangeEvent extends GUIEvent {
    static readonly NAME = 'valueChange';
    value: number;
    constructor (target: RMLNode, value: number) {
        super (target);
        this.value = value;
    }
}

export class AttributeChangeEvent extends GUIEvent {
    static readonly NAME = 'attributeChange';
    name: string;
    removed: boolean;
    constructor (target: RMLElement, name: string, removed: boolean) {
        super (target);
        this.name = name;
        this.removed = removed;
    }
}

export class TextContentChangeEvent extends GUIEvent {
    static readonly NAME = 'elementTextContentChange';
    constructor (target: RMLNode) {
        super (target);
    }
}

export class DOMTreeEvent extends GUIEvent {
    static readonly NAME_INSERTED = 'elementInserted';
    static readonly NAME_REMOVED = 'elementRemoved';
    static readonly NAME_FOCUSED = 'elementFocused';
    parent: RMLNode;
    constructor (target: RMLNode, parent: RMLNode) {
        super (target);
        this.parent = parent;
    }
}


