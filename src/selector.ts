import { RMLElement, RMLNode } from '.';
import { List, ListIterator } from './misc';

const rIdentifier = /^([^\s\.\*\[\]\|\(\)\$\^\+#><~!=:]+)/;
const rOp = /^\s*(=|~=|\|=|\^=|\$=|\*=)?\s*/;
const rCombine = /^\s*([>|~|+]?)\s*/;
const rLiteral = /^"(.*)"|'(.*)'/;
const rCloseBracket = /^\s*\]/;
const rWS = /^\s*$/;

enum Combine {
    NONE,
    DESCEND,
    CHILD,
    SIBLING,
    ADJACENT
}

enum Op {
    ANY,
    EQUAL,
    CONTAINS,
    START,
    END
}

enum Filter {
    NONE,
    TAGNAME,
    CLASS,
    ID,
    COMBINE,
    ATTRIBUTE,
    PSEUDO_CLASS,
    PSEUDO_ELEMENT
}

interface FilterInfo {
    type: Filter;
    name?: string; // tag|class|id|pseudo
    combineType?: Combine;
    attribOp?: Op;
    attribKey?: string;
    attribValue?: string;
    numIds?: number;
    numClasses?: number;
    numTypes?: number;
}

interface IPseudoElementCallback {
    (node: RMLNode, pseudoType: string): void;
}

export class Rule {
    filters: List<FilterInfo>;
    targets: Set<RMLNode>;
    specificity: number;
    constructor () {
        this.filters = new List<FilterInfo>();
        this.targets = new Set();
        this.specificity = 0;
    }
    resolve (roots: RMLNode[], up: boolean, allowInternal: boolean, pseudoElementCallback?: IPseudoElementCallback) {
        let allElements: Set<RMLNode> = new Set();
        for (const root of roots) {
            this._traverseElement (root, allowInternal, el => {
                allElements.add (el);
            });
            if (up) {
                let p = root.parentNode;
                while (p) {
                    if (allowInternal || p.nodeType === RMLNode.ELEMENT_NODE) {
                        allElements.add (p as RMLElement);
                    }
                    p = p.parentNode;
                }
            }
        }
        this.targets = new Set(allElements);
        for (const it = this.filters.begin(); it.valid(); it.next()) {
            if (it.data.type != Filter.COMBINE) {
                let tmp: Set<RMLNode> = new Set(); 
                for (const el of this.targets) {
                    this._walkWithFilter (it, el, tmp, allowInternal, allElements, pseudoElementCallback);
                }
                this.targets = tmp;
            }
        }
    }
    private _traverseElement (element: RMLNode, allowInternal: boolean, cb: (element: RMLNode) => void): void {
        if (allowInternal || !element._isInternal()) {
            if (allowInternal || element.nodeType === RMLNode.ELEMENT_NODE) {
                cb (element as RMLElement);
            }
            for (const child of element._getChildren()) {
                this._traverseElement (child, allowInternal, cb);
            }
        }
    }
    private _check (filter: FilterInfo, element: RMLNode): boolean {
        switch (filter.type) {
            case Filter.TAGNAME:
                return element.nodeType === RMLNode.ELEMENT_NODE && (element as RMLElement).tagName === filter.name;
            case Filter.CLASS:
                return element.nodeType === RMLNode.ELEMENT_NODE && (element as RMLElement).classList.contains (filter.name);
            case Filter.ID:
                return element.nodeType === RMLNode.ELEMENT_NODE && (element as RMLElement).id === filter.name;
            case Filter.ATTRIBUTE: {
                if (element.nodeType === RMLNode.ELEMENT_NODE) {
                    const val = (element as RMLElement).getAttribute (filter.attribKey);
                    switch (filter.attribOp) {
                        case Op.ANY:
                            return val !== undefined;
                        case Op.CONTAINS:
                            return typeof val === 'string' && val.indexOf (filter.attribValue) >= 0;
                        case Op.EQUAL:
                            return val === filter.attribValue;
                        case Op.START:
                            return typeof val === 'string' && val.indexOf (filter.attribValue) === 0;
                        case Op.END:
                            return typeof val === 'string' && val.length >= filter.attribValue.length && val.substr (-filter.attribValue.length) === filter.attribValue;
                        default:
                            return false;
                    }
                } else {
                    return false;
                }
            }
            case Filter.PSEUDO_CLASS: {
                switch (filter.name) {
                    case 'hover':
                        return element._isHover ();
                    case 'active':
                        return element._isActive ();
                    case 'disabled':
                        return !element.enabled;
                    case 'empty':
                        return element.childNodes.length === 0;
                    case 'enabled':
                        return element.enabled;
                    case 'first-child':
                        return !element.previousSibling;
                    case 'last-child':
                        return !element.nextSibling;
                    case 'only-child':
                        return !element.previousSibling && !element.nextSibling;
                    case 'focus':
                        return element.gui.getFocus() === element;
                    case 'focus-within':
                        return !!element.gui.getFocus()?._isSucceedingOf (element);
                    default:
                        return false;
                }
            }
            case Filter.NONE:
                return true;
            default:
                return false;
        }
    }
    private _walkWithFilter (filter: ListIterator<FilterInfo>, last: RMLNode, targets: Set<RMLNode>, allowInternal: boolean, elementSet?: Set<RMLNode>, pseudoElementCallback?: IPseudoElementCallback) {
        const prevIt = filter.getPrev ();
        const lastFilter = prevIt.valid() ? prevIt.data : null;
        switch (filter.data.type) {
            case Filter.NONE:
            case Filter.TAGNAME: 
            case Filter.CLASS:
            case Filter.ID:
            case Filter.PSEUDO_CLASS:
            case Filter.ATTRIBUTE: {
                if (lastFilter === null || lastFilter.type !== Filter.COMBINE) {
                    if (this._check (filter.data, last)) {
                        targets.add (last);
                    }
                } else if (lastFilter) {
                    switch (lastFilter.combineType) {
                        case Combine.CHILD: {
                            for (const child of last._getChildren()) {
                                if (child.nodeType === RMLNode.ELEMENT_NODE && elementSet.has(child) && this._check (filter.data, child as RMLElement)) {
                                    targets.add (child as RMLElement);
                                }
                            }
                            break;
                        }
                        case Combine.DESCEND: {
                            for (const child of last._getChildren()) {
                                if (child.nodeType === RMLNode.ELEMENT_NODE) {
                                    this._traverseElement (child as RMLElement, allowInternal, el => {
                                        if (elementSet.has(el) && this._check (filter.data, el)) {
                                            targets.add (el);
                                        }
                                    });
                                }
                            }
                            break;
                        }
                        case Combine.SIBLING: {
                            let next = last.nextSibling;
                            while (next) {
                                if (next.nodeType === RMLNode.ELEMENT_NODE && elementSet.has(next) && this._check (filter.data, next as RMLElement)) {
                                    targets.add (next as RMLElement);
                                }
                                next = next.nextSibling;
                            }
                            break;
                        }
                        case Combine.ADJACENT: {
                            let next = last.nextSibling;
                            if (next && next.nodeType === RMLNode.ELEMENT_NODE && elementSet.has(next) && this._check (filter.data, next as RMLElement)) {
                                targets.add (next as RMLElement);
                            }
                            break;
                        }
                    }
                }
                break;
            }
            case Filter.PSEUDO_ELEMENT: {
                if (pseudoElementCallback && lastFilter && lastFilter.type !== Filter.COMBINE && !filter.getNext().valid()) {
                    pseudoElementCallback (last, filter.data.name);
                }
                break;
            }
        }
    }
}

export class RMLSelector {
    protected _rules: Rule[];
    constructor (s: string) {
        this._rules = s ? this._createRules (s) : [];
        for (const rule of this._rules) {
            if (!this._validateRule (rule)) {
                this._rules = [];
                break;
            }
        }
    }
    resolve (root: RMLNode, excludeRoot: boolean, allowInternal): RMLNode[] {
        if (this._rules.length === 0) {
            return [];
        }
        const matched: Set<RMLNode> = new Set();
        for (const rule of this._rules) {
            rule.resolve ([root], false, allowInternal);
            for (const val of rule.targets) {
                matched.add (val);
            }
        }
        if (excludeRoot) {
            matched.delete (root);
        }
        return Array.from (matched);
    }
    multiResolve (roots: RMLNode[], allowInternal): RMLNode[] {
        if (this._rules.length === 0) {
            return [];
        }
        const matched: Set<RMLNode> = new Set();
        for (const rule of this._rules) {
            rule.resolve (roots, true, allowInternal);
            for (const val of rule.targets) {
                matched.add (val);
            }
        }
        return Array.from (matched);
    }
    rules (): Rule[] {
        return this._rules;
    }
    private _validateRule (rule: Rule): boolean {
        for (const it = rule.filters.begin(); it.valid(); it.next()) {
            const prev = it.getPrev ();
            if (it.data.type === Filter.COMBINE && prev.valid() && prev.data.type === Filter.COMBINE) {
                return false;
            }
        }
        return true;
    }
    private _createRules (s: string): Rule[] {
        return s.trim()
            .split (',')
            .map (val => val.trim())
            .filter (val => val !== '')
            .map (val => this._createRule(val))
            .filter (val => !!val)
            .sort ((a, b) => a.specificity - b.specificity);
    }
    private _createRule (s: string): Rule {
        const rule = new Rule();
        let numIds = 0;
        let numClasses = 0;
        let numTypes = 0;
        while (true) {
            const filter = this._createFilter (s);
            if (filter === null) {
                return null;
            } else if (filter[0] === null) {
                break;
            } else {
                rule.filters.append (filter[0]);
                s = filter[1];
                numIds += filter[0].numIds;
                numClasses += filter[0].numClasses;
                numTypes += filter[0].numTypes;
            }
        }
        const base = 100;
        rule.specificity = numIds * base * base + numClasses * base + numTypes;
        return rule;
    }
    private _createFilter (s: string): [FilterInfo, string] {
        if (rWS.exec(s)) {
            return [null, ''];
        }
        const info = { numIds:0, numClasses:0, numTypes:0 } as FilterInfo;
        let combine = rCombine.exec (s);
        if (combine && combine[0] === '') {
            combine = null;
        }
        if (!combine) {
            info.combineType = Combine.NONE;
            s = s.trim();
            switch (s[0]) {
                case '*': {
                    info.type = Filter.NONE;
                    s = s.substr(1);
                    break;
                }
                case '.': {
                    info.numClasses++;
                    info.type = Filter.CLASS;
                    s = s.substr (1);
                    const match = rIdentifier.exec (s);
                    if (!match) {
                        return null;
                    }
                    info.name = match[1];
                    s = s.substr (match[0].length);
                    break;
                }
                case '#': {
                    info.numIds++;
                    info.type = Filter.ID;
                    s = s.substr (1);
                    const match = rIdentifier.exec (s);
                    if (!match) {
                        return null;
                    }
                    info.name = match[1];
                    s = s.substr (match[0].length);
                    break;
                }
                case ':': {
                    info.numClasses++;
                    if (s[1] !== ':') {
                        info.type = Filter.PSEUDO_CLASS;
                        s = s.substr (1);
                        const match = rIdentifier.exec (s);
                        if (!match) {
                            return null;
                        }
                        info.name = match[1];
                        s = s.substr (match[0].length);
                    } else {
                        info.type = Filter.PSEUDO_ELEMENT;
                        s = s.substr (2);
                        const match = rIdentifier.exec (s);
                        if (!match) {
                            return null;
                        }
                        info.name = match[1];
                        s = s.substr (match[0].length);
                    }
                    break;
                }
                case '[': {
                    info.numClasses++;
                    info.type = Filter.ATTRIBUTE;
                    s = s.substr (1);
                    const matchKey = rIdentifier.exec (s);
                    if (!matchKey) {
                        return null;
                    }
                    info.attribKey = matchKey[1];
                    s = s.substr (matchKey[0].length);
                    const matchOp = rOp.exec (s);
                    if (!matchOp) {
                        return null;
                    }
                    switch (matchOp[1]) {
                        case '=':
                            info.attribOp = Op.EQUAL;
                            break;
                        case '~=':
                        case '*=':
                            info.attribOp = Op.CONTAINS;
                            break;
                        case '|=':
                        case '^=':
                            info.attribOp = Op.START;
                            break;
                        case '$=':
                            info.attribOp = Op.END;
                            break;
                        default:
                            info.attribOp = Op.ANY;
                            break;
                    }
                    s = s.substr (matchOp[0].length);
                    if (info.attribOp !== Op.ANY) {
                        const matchValue = ((s[0] === '\'' || s[0] === '\"') ? rLiteral : rIdentifier).exec (s);
                        if (!matchValue) {
                            return null;
                        }
                        info.attribValue = matchValue[1]||matchValue[2];
                        s = s.substr (matchValue[0].length);
                    }
                    const matchCloseBracket = rCloseBracket.exec (s);
                    if (!matchCloseBracket) {
                        return null;
                    }
                    s = s.substr (matchCloseBracket[0].length);
                    break;
                }
                default: {
                    info.numTypes++;
                    info.type = Filter.TAGNAME;
                    const match = rIdentifier.exec (s);
                    if (!match) {
                        return null;
                    }
                    info.name = match[1];
                    s = s.substr (match[0].length);
                    break;
                }
            }
        } else {
            s = s.substr (combine[0].length);
            info.type = Filter.COMBINE;
            if (combine[1] === '') {
                info.combineType = Combine.DESCEND;
            } else if (combine[1] === '>') {
                info.combineType = Combine.CHILD;
            } else if (combine[1] === '~') {
                info.combineType = Combine.SIBLING;
            } else /* if (combine[1] === '+') */ {
                info.combineType = Combine.ADJACENT;
            }
        }
        return [info, s];
    }
}
