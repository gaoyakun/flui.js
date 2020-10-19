import { RMLNode, RMLPrimitiveBatchList, Event } from '.';

export class GUIMouseEvent extends Event {
    static readonly NAME_RENDERER_MOUSEDOWN = 'renderermousedown';
    static readonly NAME_RENDERER_MOUSEUP = 'renderermouseup';
    static readonly NAME_RENDERER_MOUSEMOVE = 'rendermousemove';
    static readonly NAME_RENDERER_MOUSECLICK = 'rendererclick';
    static readonly NAME_RENDERER_MOUSEDBLCLICK = 'rendererdblclick';
    static readonly NAME_MOUSEDOWN = 'mousedown';
    static readonly NAME_MOUSEUP = 'mouseup';
    static readonly NAME_MOUSEMOVE = 'mousemove';
    static readonly NAME_MOUSECLICK = 'click';
    static readonly NAME_MOUSEDBLCLICK = 'dblclick';
    static readonly NAME_MOUSEENTER = 'mouseenter';
    static readonly NAME_MOUSELEAVE = 'mouseleave';
    static readonly NAME_MOUSEOVER = 'mouseover';
    static readonly NAME_MOUSEOUT = 'mouseout';
    x: number;
    y: number;
    button: number;
    keymod: number;
    constructor (type: string, x: number, y: number, button: number, keymod: number) {
        super (type, { bubbles: true, cancelable: true });
        this.x = x;
        this.y = y;
        this.button = button;
        this.keymod = keymod;
    }
}

export class GUIKeyEvent extends Event {
    static readonly NAME_KEYDOWN = 'keydown';
    static readonly NAME_KEYUP = 'keyup';
    static readonly NAME_KEYPRESS = 'keypress';
    key: number;
    name: string;
    charCode: number;
    repeat: boolean;
    keymod: number;
    constructor (type: string, key: number, name: string, charcode: number, repeat: boolean, keymod: number) {
        super (type, { bubbles: true, cancelable: true });
        this.key = key;
        this.name = name;
        this.charCode = charcode;
        this.repeat = repeat;
        this.keymod = keymod;
    }
}

export class GUIFocusEvent extends Event {
    static readonly NAME_FOCUS = 'focus';
    static readonly NAME_BLUR = 'blur';
    constructor (type: string) {
        super (type);
    }
}

export class ElementLayoutEvent extends Event {
    static readonly NAME = 'layout';
    constructor () {
        super (ElementLayoutEvent.NAME);
    }
}

export class ElementBuildContentEvent extends Event {
    static readonly NAME_PREBUILD = 'prebuildcontent';
    static readonly NAME_POSTBUILD = 'postbuildcontent';
    batchList: RMLPrimitiveBatchList;
    constructor (type: string, batchList: RMLPrimitiveBatchList) {
        super (type);
        this.batchList = batchList;
    }
}

export class ElementHittestEvent extends Event {
    static readonly NAME = 'hittest';
    x: number;
    y: number;
    allow: boolean;
    constructor (x: number, y: number) {
        super (ElementHittestEvent.NAME);
        this.x = x;
        this.y = y;
        this.allow = true;
    }
}

export class TextEvent extends Event {
    static readonly NAME_CONTENT_CHANGE = 'textcontentchange';
    static readonly NAME_FONT_CHANGE = 'textfontchange';
    constructor (type: string) {
        super (type);
    }
}

export class ValueChangeEvent extends Event {
    static readonly NAME = 'valuechange';
    value: number;
    constructor (value: number) {
        super (ValueChangeEvent.NAME);
        this.value = value;
    }
}

export class AttributeChangeEvent extends Event {
    static readonly NAME = 'attributechange';
    name: string;
    removed: boolean;
    constructor (name: string, removed: boolean) {
        super (AttributeChangeEvent.NAME);
        this.name = name;
        this.removed = removed;
    }
}

export class TextContentChangeEvent extends Event {
    static readonly NAME = 'elementtextcontentchange';
    constructor () {
        super (TextContentChangeEvent.NAME, { bubbles: true, cancelable: true });
    }
}

export class DOMTreeEvent extends Event {
    static readonly NAME_INSERTED = 'elementinserted';
    static readonly NAME_REMOVED = 'elementremoved';
    static readonly NAME_FOCUSED = 'elementfocused';
    parent: RMLNode;
    constructor (type: string, parent: RMLNode) {
        super (type, { bubbles: type !== DOMTreeEvent.NAME_FOCUSED, cancelable: type !== DOMTreeEvent.NAME_FOCUSED });
        this.parent = parent;
    }
}


