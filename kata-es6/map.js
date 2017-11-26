/**
 * Created by zhigang.zhang on 17-5-7.
 */
/**
 * Map的key可以是任何类型 不仅限于字符串
 * key是按严格比较进行计算的
 * */

title('basic');
{
    {
        equal(typeof Map, 'function');
    }

    {
        let map = new Map();
        map.set('key','value');
        const value = map.get('key');
        equal(value, 'value');
    }

    {
        let map = new Map();
        map.set('key', 'value');
        const hasIt = map.has('key');
        equal(hasIt, true);
    }

    {
        let map = new Map();
        map.set('1', 'one');
        map.set('2', 'two');
        const mapAsArray = [...map];
        deepEqual(mapAsArray, [['1', 'one'], ['2', 'two']]);
    }


    {
        const obj = {x: 1};
        const otherObj = {x: 1};
        let map = new Map();
        map.set(obj, '');
        equal(map.has(otherObj), false);
    }
}

title('get');
{
    {
        let map = new Map();
        map.set('key', 'value');
        const value = map.get('key');
        equal(value, 'value');
    }

    {
        let map = new Map();
        map.set('value', 'value');
        var value = map.get(map.get(map.get('value')));
        equal(value, 'value');
    }

    {
        let map = new Map();
        const obj = {};
        map.set(obj, 'object is key');
        equal(map.get(obj), 'object is key');
    }

    {
        let map = new Map();
        map.set(void 0, 'yo');
        const value = map.get();
        equal(value, 'yo');
    }

    {
        let map = new Map();
        map.set(void 0);
        const value = map.get();
        equal(value, void 0);
    }
}

title('has');
{
    {
        let map = new Map();
        const hasKey = map.has(void 0);
        equal(hasKey, false);
    }

    {
        let map = new Map([['key', 'VALUE']]);
        const hasKey = map.has('key');
        equal(hasKey, true);
    }

    {
        let map = new Map([[void 0, 'not defined key']]);
        const hasUndefinedAsKey = map.has(void 0);
        equal(hasUndefinedAsKey, true);
    }

    {
        let map = new Map([[1, 'one']]);
        const findsStringOne = false;
        equal(map.has('1'), findsStringOne);
    }

    {
        let map = new Map([[1, 'one']]);
        equal(map.has(1), true);
    }

    {
        let map = new Map([[]]);
        equal(map.has(void 0),true);
    }
}

title('initialize');
{
    {
        const map = new Map();
        equal(map.size, 0);
    }

    {
        const mapSize = new Map([[]]).size;
        equal(mapSize, 1);
    }

    {
        let map1 = new Map([[1]]);
        let map2 = new Map().set(1, void 0);
        assertMapsEqual(map1, map2);
    }

    {
        const pair1 = [1, 'one'];
        const pair2 = [2, 'two'];
        const map = new Map([pair1,pair2]);
        assertMapsEqual(map, new Map().set(...pair1).set(...pair2));
    }

    {
        const pair1 = [1, 'one'];
        const pair2 = [1, 'uno'];
        const pair3 = [1, 'eins'];
        const pair4 = [2, 'two'];
        const map = new Map([pair1, pair2,pair3, pair4]);
        assertMapsEqual(map, new Map().set(...pair3).set(...pair4));
    }

    {
        let map = new Map();
        const obj = {x: 1, y: 2};
        const keys = Object.keys(obj);
        keys.forEach(key => map.set(key,obj[key]));
        const expectedEntries = [['x', 1], ['y', 2]];
        assertMapsEqual(map, expectedEntries);
    }

    function mapToArray(map) {
        return Array.from(map);
    }
    function assertMapsEqual(map1, map2) {
        deepEqual(mapToArray(map1), mapToArray(map2));
    }
}

title('set');
{
    {
        let map = new Map();
        map.set('key','value');
        equal(map.get('key'), 'value');
    }

    {
        const noop = function() {};
        let map = new Map();
        map.set(noop, 'the real noop');
        equal(map.get(noop), 'the real noop');
    }

    {
        let map = new Map();
        map.set('key', 'value');
        map.set('key', 'value3');
        equal(map.get('key'), 'value3');
    }

    {
        let map = new Map();
        map.set(1, 'one')
            .set(2, 'two')
            .set(3,'three');

        deepEqual([...map.keys()], [1,2,3]);
        deepEqual([...map.values()], ['one', 'two', 'three']);
    }
}