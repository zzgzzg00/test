/**
 * Created by zhigang.zhang on 17-5-7.
 */
/**
 * 定义generator方式
 *  function* xxx(){};
 *  let xxx=funcion* (){};
 *  let obj={* xxx(){}};
 *  class Test{* [xxx](){}};
 * */
/**
 * itertor可以数组话/解构
 *  Array.from(iterator) / [a,...b]=iterator
 * generator里return的值不会被for Array.from遍历到 但会被next()获取
 * */
/**
 * next里可以传输参数供yield执行
 * */

title('creation');
{
    {
        function* g() {}
        generator(g());
    }

    {
        let g = function* () {};
        generator(g());
    }

    {
        let obj = {
            * g() {}
        }
        generator(obj.g());
    }

    {
        const generatorName = 'g';
        let obj = {
            * [generatorName]() {}
        }
        g(obj.g());
    }

    {
        const generatorName = 'g';
        class Klazz {
            * [generatorName]() {}
        }
        generator(new Klazz().g());
    }

    function assertIsGenerator(gen) {
        const toStringed = '' + gen;
        assert.equal(toStringed, '[object Generator]');
    }
}

title('generator');
{
    function* generatorFunction(){
        yield 1;
        yield 2;
    }
    let generator=generatorFunction();

    {
        const typeOfTheGenerator = 'object';
        equal(typeof generator, typeOfTheGenerator);
    }

    {
        const key = 'next';//Symbol.iterator
        equal(key in generator, true);
    }

    /*{
        const theType = typeof generator['Symbol.iterator'];
        equal(theType, 'function');
    }*/
}

title('return');
{
    {
        function* generatorFunction() { return 1; }
        const returned = generatorFunction().next();
        const propertyNames = ['value','done'];
        deepEqual(Object.keys(returned), propertyNames);
    }

    {
        function* generatorFunction() { return 23; }
        const {value} = generatorFunction().next();
        equal(value, 23);
    }

    {
        function* generatorFunction() { yield 42; }
        const {done} = generatorFunction().next();
        equal(done, false);
    }

    {
        function* generatorFunction() { return 1; }
        const returned = generatorFunction().next();
        deepEqual(returned, {value: 1, done: true});
    }

    {
        function* generatorFunction() { yield; }
        const returned = generatorFunction().next();
        deepEqual(returned, {value: void 0, done: false});
    }

    function* generatorFunctionWithYieldAndReturn() {
        yield 1;
    }

    {
        const iterator = generatorFunctionWithYieldAndReturn();
        const values = [
            iterator.next(),
            iterator.next()
        ];
        deepEqual(values, [{value: 1, done: false}, {value: void 0, done: true}]);
    }

    {
        const iterator = generatorFunctionWithYieldAndReturn();
        const values = [1];
        deepEqual(Array.from(iterator), values);
    }

    {
        function* generatorFunctionWithTwoYields() {
            yield 1;
            yield 2;
        }
        deepEqual(Array.from(generatorFunctionWithTwoYields()), [1, 2]);
    }

    {
        function* generatorFunction() {
            let result=yield 1;
            return result;
        }
        const iterator = generatorFunction();
        const values = [
            iterator.next().value,
            iterator.next(2).value
        ];
        deepEqual(values, [1, 2]);
    }
}

title('send-function');
{
    {
        let fn = function() {};
        function* generatorFunction() {
            equal(yield null, fn); // remember, don't touch this line
        }
        let iterator = generatorFunction();
        iterator.next();
        iterator.next(fn);
    }

    {
        function* generatorFunction() {
            yield (yield 1)();
        }
        var iterator = generatorFunction();
        var iteratedOver = [iterator.next().value, iterator.next(()=>2).value];
        deepEqual([1, 2], iteratedOver);
    }

    {
        function* generatorFunction() {
            yield (yield (yield 1)());
        }
        const iterator=generatorFunction();
        var iteratedOver = [
            iterator.next().value,
            iterator.next(()=>2).value,
            iterator.next(3).value
        ];
        deepEqual([1, 2, 3], iteratedOver);
    }
}

title('send-value');
{
    {
        function* generatorFunction() {
            yield 1;
            yield 2;
        }
        // way #1
        var convertedToAnArray = Array.from(generatorFunction());
        // way #2
        var iterator = generatorFunction();
        var iteratedOver = [iterator.next().value, iterator.next().value];
        deepEqual(convertedToAnArray, iteratedOver);
    }

    {
        function* generatorFunction() {
            const param=yield 1;
            yield param;
        }
        var iterator = generatorFunction();
        var iteratedOver = [iterator.next().value, iterator.next(2).value];
        deepEqual([1, 2], iteratedOver);
    }

    {
        function* generatorFunction() {
            const result=yield 1;
            yield result;
        }
        let iterator = generatorFunction();
        const values = [
            iterator.next('irrelevant').value,
            iterator.next(2).value
        ];
        deepEqual(values, [1, 2]);
    }
}

title('yield');
{
    function* generatorFunction() {
        yield 'hello';
        yield 'world';
    }

    {
        let generator=generatorFunction();
        let values = Array.from(generator);
        deepEqual(values, ['hello', 'world']);
    }

    {
        let generator=generatorFunction();
        const {value} = generator.next();
        equal(value, 'hello');
    }

    {
        let generator=generatorFunction();
        let values = Array.from(generator);
        const {done} = generator.next();
        equal(done, true);
    }

    let generator=generatorFunction();
    let secondItem=generator.next();
    secondItem=generator.next();
    {
        let {value} = secondItem;
        equal(value, 'world');
    }

    {
        const {done} = secondItem;
        equal(done, false);
    }
}