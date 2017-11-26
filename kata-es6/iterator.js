/**
 * Created by zhigang.zhang on 17-5-7.
 */
/**
 * iterator可以被Array.from ...iterator等操作
 * iterator返回的done为true的项不会被遍历
 * */

title('array');
{
    const arr = ['a', 'B', 'see'];
    {
        const iterator = arr[Symbol.iterator];
        const theType = typeof iterator;
        const expected = 'function';
        equal(theType, expected);
    }

    {
        let count = 0;
        for (let value of arr) {
            count++;
        }
        equal(count, arr.length);
    }

    {
        const iterator = arr[Symbol.iterator]();
        const firstItem = iterator.next();
        deepEqual(firstItem, {value: 'a',done: false});
    }

    {
        const arr = [];
        const iterator = arr[Symbol.iterator]();
        const afterLast = iterator.next();
        deepEqual(afterLast, {value: void 0,done: true});
    }
}

title('protocol');
{
    function iteratorFunction() {
        return {
            next(){
                return {done:true}
            }
        }
    }

    {
        equal(typeof iteratorFunction(), 'object');
    }

    {
        equal(typeof iteratorFunction().next, 'function');
    }

    {
        deepEqual(iteratorFunction().next(), {done: true});
    }
}

title('strings');
{
    const s = 'abc';

    {
        const isA = s[Symbol.iterator];
        equal(typeof isA, 'function');
    }

    {
        const arr = [...s];
        deepEqual(arr, ['a', 'b', 'c']);
    }

    /*{
        let iterator = s[Symbol.iterator]();
        const description = iterator.toString();
        equal(description, '[object String Iterator]');
    }*/

    {
        let iterator = s[Symbol.iterator]();
        const value = iterator.next();
        deepEqual(value, {value: 'a',done: false});
    }

    {
        let iterator = s[Symbol.iterator]();
        iterator.next();
        iterator.next();
        iterator.next();
        equal(iterator.next().done, true);
    }
}

title('usages');
{
    class ConsumableUsers {
        constructor() {
            this.users = ['Alice', 'Bob',0];
        }
        get nextUser() {
            if (this.users.length > 0) {
                return `user: ${this.users.shift()}`;
            }
            return void 0;
        }
        get anyLeft() {
            return this.users.length == 0;
        }
    }
    function beforeEach(){
        const consumableUsers = new ConsumableUsers();
        function iteratorFunction() {
            return {
                next: function() {
                    return {value: consumableUsers.nextUser, done: consumableUsers.anyLeft}
                }
            }
        }
        let usersIterable = {
            [Symbol.iterator]:iteratorFunction
        };
        return usersIterable;
    }

    {
        let usersIterable=beforeEach();
        const isIterable = Symbol.iterator in usersIterable;
        equal(isIterable, true);
    }

    {
        let usersIterable=beforeEach();
        const iterator = usersIterable[Symbol.iterator]();
        equal(typeof iterator, 'object');
    }

    {
        let usersIterable=beforeEach();
        const iterator = usersIterable[Symbol.iterator]();
        equal(typeof iterator.next, 'function');
    }

    {
        const iterator=beforeEach()[Symbol.iterator]();
        const firstItem = iterator.next();
        deepEqual(firstItem, {value: "user: Alice", done: false});
    }
    {
        const iterator=beforeEach()[Symbol.iterator]();
        iterator.next();
        const secondItem = iterator.next();
        deepEqual(secondItem, {value: "user: Bob", done: false});
    }

    {
        const iterator=beforeEach()[Symbol.iterator]();
        iterator.next();
        iterator.next();
        const beyondLast = iterator.next();
        deepEqual(beyondLast, {value: 'user: 0', done: true});
    }

    {
        let usersIterable=beforeEach();
        const users = [...usersIterable];
        deepEqual(users, ['user: Alice', 'user: Bob']);
    }
    {
        let usersIterable=beforeEach();
        const users = [];
        for (let user of usersIterable) users.push(user);
        deepEqual(users, ['user: Alice', 'user: Bob']);
    }
    {
        let usersIterable=beforeEach();
        const users = ['noname',...usersIterable];
        deepEqual(users, ['noname', 'user: Alice', 'user: Bob']);
    }
    {
        let usersIterable=beforeEach();
        const [firstUser, secondUser] = usersIterable;
        equal(firstUser, 'user: Alice');
        equal(secondUser, 'user: Bob');
    }
}