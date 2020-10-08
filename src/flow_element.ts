import { RMLElement, GUI, tagname, RMLSelector, IStyleSheet, TextContentChangeEvent, parseStyleSheet } from '.';

@tagname ('html')
@tagname ('body')
export class FlowElement extends RMLElement<FlowElement> {
    constructor (uiscene: GUI) {
        super (uiscene);
    }
    /** @internal */
    _getDefaultStyleSheet (): IStyleSheet {
        const style = {} as IStyleSheet;
        style.width = '100%';
        style.height = 'auto';
        style.flexDirection = 'column';
        style.justifyContent = 'flex-start';
        style.alignItems = 'stretch';
        style.flex = '0 0 auto';
        style.overflow = 'auto';
        return style;
    }
}