/**
 * Created by zhigang.zhang on 17-5-6.
 */
/**
 * Array.prototype.entries 数组转换为[key,value]二维数组
 *  返回iterator
 *      二维数组 [index,item]
 * */
/**
 * Array.prototype.fill 填充数组
 *  params
 *      fillcontent,[start],[end]
 * */
/**
 * Array.prototype.find 找出符合条件的item 没有返回undefined
 * */
/**
 * Array.prototype.findIndex 找出符合条件的index 没有返回-1
 * */
/**
 * Array.prototype.from 转换数组
 * 将有length属性的对象或者部署了[Symbol.iterator]的元素转为数组
 * params
 *    obj,[mapFunction]
 * */
/**
 * Array.prototype.keys 获取数组索引
 * 返回iterator
 * */
/**
 * Array.prototype.of 构建数组
 * */

title('entries');
{
    {
        const arr = ['a', 'b', 'c'];
        const entriesAsArray = Array.from(arr.entries());
        log(entriesAsArray)//[[0,"a"], [1,"b"], [2,"c"]]
    }

    {
        const arr = ['one'];
        arr[2] = 'three';
        const secondValue = arr.entries();
        secondValue.next();
        log(secondValue.next().value)//[1, void 0]
    }

    {
        const arr = ['one'];
        const value = [...arr.entries()]
        log(value)//[0, 'one']
    }
}

title('fill');
{
    {
        const arr = new Array(3).fill(0);
        log(arr);//[0, 0, 0];
    }

    {
        const arr = [undefined].fill(0);
        log(arr);//[0];
    }

    {
        const fillPosition = 2;
        const arr = [1,2,3].fill(42, fillPosition);
        log(arr);//[1, 2, 42]
    }

    {
        const fillStartAt = 1;
        const fillEndAt = 2;
        const arr = [1,2,3].fill(42, fillStartAt, fillEndAt);
        log(arr);//[1, 42, 3]
    }
}

title('find');
{
    {
        const found = [false, true].find(item=>~~item===0);
        log(found);//true
    }

    {
        const found = [0, 1,2].find(item => item > 1);
        log(found);//2
    }

    {
        const found = [1, 2, 3].find(item => item>4);
        log(found);//;void 0
    }

    {
        const bob = {name: 'Bob'};
        const alice = {name: 'Alice'};
        const found = [bob, alice].find(({name:{length}}) => length>3);
        log(found===alice);//true
    }
}

title('findIndex');
{
    {
        const foundAt = [false, true].findIndex(item=>item>0);
        log(foundAt);//1
    }

    {
        const foundAt = [0, 1, 1, 1].findIndex(item => item == 1);
        log(foundAt);//1
    }

    {
        const foundAt = [1, 2, 3].findIndex(item => item < 1);
        log(foundAt);//-1
    }

    {
        const three = 3;
        const containsThree = arr => arr.indexOf(three) > -1;
        function theSecondThree(item,index, arr) {
            const preceedingItems = arr.slice(0, index);
            return containsThree(preceedingItems);
        }
        const foundAt = [1, 1, 2, 3, 3, 3].findIndex(theSecondThree);
        log(foundAt);//4;
    }
}

title('from');
{
    const arrayLike = {0: 'one', 1: 'two', length: 2};
    {
        const arr = Array.from(arrayLike);
        log(arr);// ['one', 'two'];
    }

    {
        document.body.classList.add('some');
        document.body.classList.add('other');
        const classList = Array.from(document.body.classList);
        log(classList);//['some', 'other']
    }

    {
        const nodeList = document.querySelectorAll('body');
        const bodies = Array.from(nodeList).filter((node) => node === document.body);
        log(bodies);//[document.body];
    }

    {
        const arr = Array.from(arrayLike, (value) => value.toUpperCase());
        log(arr);//['ONE', 'TWO']
    }

    {
        const arr = Array.from(arrayLike, (value,key) => `${key}=${value}`);
        log(arr);//['0=one', '1=two'];
    }
}

title('keys');
{
    {
        const arr = ['a','b'];
        const iterator = arr.keys();
        log(iterator.next());//{value: 0, done: false};
        log(iterator.next());//{value: 1, done: false};
    }

    {
        const arr = [1, 2];
        const keys = Array.from(arr.keys());
        log(keys);//[0, 1];
    }

    {
        const arr = ['empty me'];
        const keys = [...arr.keys()];
        log(keys.length);//1;
    }

    {
        const arr = [,,];
        const keys = [...arr.keys()];
        log(keys);//[0, 1];
    }

    {
        const arr = ['a', , 'c'];
        const keys = [...arr.keys()];
        log(keys);//[0, 1, 2];
    }
}

title('of');
{
    {
        const arr = Array.of(10);
        log(arr);//[10];
    }

    {
        const arr = Array.of(1,2);
        log(arr);//[1, 2];
    }

    {
        const starter = [1, 2];
        const end = [3, '4'];
        const arr = Array.of(...starter, ...end);
        log(arr);//[1, 2, 3, '4'];
    }
}

title('values');
subtitle('may not support');
/*{
    {
        const arr = ['k', 'e', 'y'];
        const iterator = arr.values();
        log(iterator.next());//{value: 'k', done: false};
    }

    {
        const arr = ['keys', 'values', 'entries'];
        const iterator = arr.values();
        iterator.next();
        log([...iterator]);//['values', 'entries'];
    }

    {
        const arr = [...[...[...[...'1']]]];
        const values = [...arr.values()];
        log(values.length);//1;
    }

    {
        const arr = [, 0];
        const keys = [...arr.values()];
        log(keys);//[void 0, void 0];
    }

    {
        const arr = ['a',,'c'];
        log([...arr.values()]);//['a', void 0, 'c'];
    }
}*/