/**
 * Created by zhigang.zhang on 17-5-7.
 */
/**
 * [,,c]=[1,2,3,4]
 * */
/**
 * 解构可以赋默认值
 * 但凡有类似数组索引取值/对应对象的属性的都可以用解构来取值
 *  const {length}='123'
 *  const [a,,b]='123'
 * */
/**
 * 解构、函数参数、函数参数默认值、对象key-value不一致可以混用
 * */

title('array');
{
    {
        let [firstValue] = [1];
        equal(firstValue, 1);
    }

    {
        let [x, y] = ['ax', 'why'];
        [y,x] = [x, y];
        deepEqual([x, y], ['why', 'ax']);
    }

    {
        const all = ['ax', 'why', 'zet'];
        const [,,z] = all;
        equal(z, 'zet');
    }

    {
        const user = [['Some', 'One'], 23];
        const [[firstName, surname], age] = user;
        const expected = 'Some One = 23 years';
        equal(`${firstName} ${surname} = ${age} years`, expected);
    }

    {
        let c, d;
        let [a, b] = [c, d] = [1, 2];
        deepEqual([a, b, c, d], [1, 2, 1, 2]);
    }

    {
        for (var [a, b] of [[0, 1, 2]]) {}
        deepEqual([a, b], [0,1]);
    }
}

title('defaults');
{
    {
        const [a=1] = [];
        equal(a, 1);
    }

    {
        const [b=2] = [,,3];
        equal(b, 2);
    }

    {
        const [a, b=2] = [];
        equal(b, 2);
    }

    {
        const {a, b=[2]} = {a: 1, b: void 0};
        deepEqual(b, [2]);
    }

    {
        const [a,b=2] = '1';
        equal(a, '1');
        equal(b, 2);
    }
}

title('object');
{
    {
        const {x} = {x: 1};
        equal(x, 1);
    }

    {
        const magic = {first: 23, second: 42};
        const {magic: {second}} = {magic};
        equal(second, 42);
    }

    {
        const {z:[x]} = {z: [23, 42]};
        equal(x, 23);
    }
    {
        const [,[{lang}]] = [null, [{env: 'browser', lang: 'ES6'}]];
        equal(lang, 'ES6');
    }

    {
        const {z} = {x: 1};
        equal(z, void 0);
    }

    {
        const {substr} = '1';
        equal(substr, String.prototype.substr);
    }
}

title('paramters');
{
    {
        const fn = ({id,name}) => {
            equal(id, 42);
            equal(name, 'Wolfram');
        }
        const user = {name: 'Wolfram', id: 42};
        fn(user);
    }

    {
        const fn = ([,{name}]) => {
            equal(name, 'Alice');
        }
        const users = [{name: 'nobody'}, {name: 'Alice', id: 42}];
        fn(users);
    }

    {
        const fn = (id, name='Bobby') => {
            equal(id, 23);
            equal(name, 'Bobby');
        }
        fn(23);
    }

    {
        const defaultUser = {id: 23, name: 'Joe'};
        const fn = ([user]) => {
            deepEqual(user, defaultUser);
        }
        fn([defaultUser]);
    }

    {
        const fn = (id=1, [arr=2], {obj=3}) => {
            equal(id, 1);
            equal(arr, 2);
            equal(obj, 3);
        }
        fn(void 0, [], {});
    }
}

title('rename');
{
    {
            const {x:y} = {x: 1};
            equal(y, 1);
    }

    {
        const {x:y=42} = {y: 23};
        equal(y, 42);
    }

    {
        const fn = ({x:y}) => {
            equal(y, 1);
        }
        fn({x:1});
    }

    {
        const fn = ({x:y=3}) => {
            equal(y, 3);
        }
        fn({});
    }
}

title('string');
{
    {
        let [a, b, c] = 'abc';
        deepEqual([a, b, c], ['a', 'b', 'c']);
    }

    {
        const [a, ,c] = 'ab';
        equal(c, void 0);
    }

    {
        const [space, coffee] = ' a ☕';
        equal(coffee, 'a');
    }
}