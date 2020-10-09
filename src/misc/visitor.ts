type VisitFuncMap = Map<Constructor<object>, (t: any)=>any>;

interface Constructor<T = any> {
    new (...args: any[]): T;
}

function superClassOf (cls: Constructor): Constructor {
    return Object.getPrototypeOf (cls.prototype).constructor;
}

export function visitor (T: Constructor) {
    return function (target: any, propertyKey: string) {
        Visitor.setVisitFunc(target.constructor, T, target[propertyKey]);    
    }
}

export class Visitor {
    private readonly visitFuncMap: VisitFuncMap;
    private static readonly visitorFuncMap: Map<Constructor, VisitFuncMap> = new Map();
    constructor () {
        this.visitFuncMap = Visitor._getFuncMap (this.constructor as Constructor);
    }
    visit (target: object): any {
        return this.visitWithType (target, target.constructor as Constructor);
    }
    /*
    visitSuper (target: object): any {
        let c = target.constructor && target.constructor.prototype && target.constructor.prototype.__proto__ && target.constructor.prototype.__proto__.constructor;
        return c && this.visitWithType (target, c);
    }
    */
    visitWithType (target: object, type: Constructor) {
        if (target) {
            let func: (t: object)=>any = null;
            while (type !== Object && !func) {
                func = this.visitFuncMap.get (type);
                if (!func) {
                    type = superClassOf (type);
                    // type = type.prototype && type.prototype.__proto__ && type.prototype.__proto__.constructor;
                }
            }
            return func && func.call (this, target);
        }
    }
    static getVisitFunc<T = Visitor, U = any> (visitorType: Constructor<T>, targetType: Constructor<U>): (this:T, target:U)=>any {
        const funcMap = Visitor._getFuncMap (visitorType);
        return funcMap ? funcMap.get (targetType as Constructor) : null;
    }
    static setVisitFunc<T = Visitor, U = any> (visitorType: Constructor<T>, targetType: Constructor<U>, func: (this:T, target:U)=>any) {
        const funcMap = Visitor._getFuncMap (visitorType);
        funcMap && funcMap.set (targetType as Constructor, func);
    }
    static removeVisitFunc<T = Visitor, U = any> (visitorType: Constructor<T>, targetType: Constructor<U>) {
        const funcMap = Visitor._getFuncMap (visitorType);
        funcMap && funcMap.delete (targetType as Constructor);
    }
    private static _getFuncMap (visitorType: Constructor) {
        let funcMap = Visitor.visitorFuncMap.get (visitorType);
        if (!funcMap) {
            funcMap = new Map();
            Visitor.visitorFuncMap.set(visitorType, funcMap);
        }
        return funcMap;
    }
}