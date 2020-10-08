import { RMLElement, GUI, tagname, RMLSelector, IStyleSheet, TextContentChangeEvent, parseStyleSheet } from '.';

/** @internal */
export interface IStyleDefiniation {
    selector: RMLSelector;
    stylesheet: IStyleSheet;
    extra: object;
}

@tagname ('style')
export class StyleElement extends RMLElement<StyleElement> {
    private _definitions: IStyleDefiniation[];
    constructor (uiscene: GUI) {
        super (uiscene);
        this._definitions = [];
        this.on (TextContentChangeEvent.NAME, null, (eventName:string, data: TextContentChangeEvent) => {
            this._update ();
        });
    }
    /** @internal */
    get definitions (): IStyleDefiniation[] {
        return this._definitions;
    }
    /** @internal */
    private _update () {
        this._definitions = this._uiscene._parseStyleContent (this.textContent);
        if (this._isSucceedingOf (this._uiscene.document)) {
            this._uiscene.requireFullStyleRefresh ();
        }
    }
    /** @internal */
    _getDefaultStyleSheet (): IStyleSheet {
        const style = {} as IStyleSheet;
        style.display = 'none';
        return style;
    }
}