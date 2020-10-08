import { RMLElement, GUI, tagname, IStyleSheet } from '..';

@tagname ('button')
export class Button extends RMLElement<Button> {
    constructor (uiscene: GUI) {
        super (uiscene);
    }
    /** @internal */
    _applyInlineStyles () {
        super._applyInlineStyles ();
    }
    /** @internal */
    _init () {
    }
    /** @internal */
    _getDefaultStyleSheet (): IStyleSheet {
        const style = super._getDefaultStyleSheet ();
        style.flexDirection = 'row';
        style.padding = '2';
        style.justifyContent = 'center';
        style.backgroundColor = '#1074e7';
        return style;
    }
}
