import { RMLElement, GUI, tagname, IStyleSheet } from '.';

@tagname ('link')
@tagname ('head')
@tagname ('meta')
export class DummyElement extends RMLElement<DummyElement> {
    constructor (uiscene: GUI) {
        super (uiscene);
    }
    /** @internal */
    _getDefaultStyleSheet (): IStyleSheet {
        return { display: 'none' };
    }
}