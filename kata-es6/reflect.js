/**
 * Created by zhigang.zhang on 17-5-7.
 */
/**
 * Reflect.apply
 *  params:func,context,paramsarr
 * */
/**
 * Reflect.construct
 *  params:ClassName,paramsarr
 * */
/**
 * Reflect.defineProperty
 * params:obj,attribute,descriptor
 * return true/false
 * */

title('apply');
{
    {
        let fn=()=>42;
        equal(Reflect.apply(fn, void 0, []), 42);
    }
    {
        class FourtyTwo {
            constructor() {
                this.value = 42
            }
            fn() {
                return this.value
            }
        }
        let instance = new FourtyTwo();
        const fourtyTwo = Reflect.apply(instance.fn,instance,[]);
        equal(fourtyTwo, 42);
    }
    {
        let emptyArrayWithFiveElements = Reflect.apply(Array,null,[5]);
        deepEqual(emptyArrayWithFiveElements.fill(42), [42, 42, 42, 42, 42]);
    }
    {
        const fn = () => ':(';
        equal(Reflect.apply(fn, void 0, []), ':(');
    }
    {
        const fn = [].slice;
        deepEqual(Reflect.apply(fn, [0, 23, 42], [1]), [23, 42]);
    }
    {
        class Bob {
            constructor() {
                this._name = 'Bob';
            }
            name() {
                return this._name;
            }
        }
        const bob = new Bob();
        const scope = bob;
        equal(Reflect.apply(bob.name, scope, []), 'Bob');
    }
}

title('basic');
{
    {
        let Class=class {};
        equal(Reflect.construct(Class, []) instanceof Class, true);
    }

    {
        let obj = {x: 42};
        equal(Reflect.get(obj, 'x'), 42);
    }

    {
        let obj = {
            x:1
        };
        equal(Reflect.has(obj, 'x'), true);
    }
}

title('construct');
{
    class Constructable {
        constructor(...args) {
            this.args = args;
        }
    }
    {
        let instance = Reflect.construct(Constructable, [1]);
        deepEqual(instance.args, [1]);
    }
    {
        const argumentsList = ['arg1', ['arg2.1', 'arg2.2'], {arg: 3}];
        let instance = Reflect.construct(Constructable,argumentsList);
        deepEqual(instance.args, argumentsList);
    }
}

title('defineProperty');
{
    {
        let obj = {};
        Reflect.defineProperty(obj, 'prop', {value:1});
        equal('prop' in obj, true);
    }
    {
        let obj = {};
        Reflect.defineProperty(obj, 2, {});
        equal('2' in obj, true);
    }
    {
        let obj = {};
        let undef ;
        Reflect.defineProperty(obj, undef, {});
        equal('undefined' in obj, true);
    }
    {
        let obj = {};
        const sym = Symbol.for('prop');
        Reflect.defineProperty(obj, sym, {});
        equal(sym in obj, true);
    }
    {
        let obj = {};
        Reflect.defineProperty(obj, 'prop',{value:'property value'});
        equal(obj.prop, 'property value');
    }
    {
        let obj = {};
        Reflect.defineProperty(obj, 'prop',{value:obj});
        equal(obj.prop, obj);
    }
    {
        let instance = new class {};
        const wasPropertyDefined = Reflect.defineProperty(instance,'a',{value:1});
        equal(wasPropertyDefined, true);
    }
}

title('getPropertyOf');
{
    function Klass() {};
    const k=new Klass();
    const proto = Reflect.getPrototypeOf(k);
    equal(proto, Klass.prototype);
}