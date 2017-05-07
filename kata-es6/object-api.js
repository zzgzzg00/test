/**
 * Created by zhigang.zhang on 17-5-7.
 */
/**
 * Object.is进行的是===比较
 * */

title('is');
{
    {
        const areSame = Object.is(1,1);
        equal(areSame, true);
    }
    {
        const areSame = Object.is(1, '1');
        equal(areSame, false);
    }
    {
        const areSame = Object.is('one', 'one');
        equal(areSame, true);
    }
    {
        const areSame = false;
        equal(Object.is(+0, -0), areSame);
    }
    {
        const number = NaN;
        equal(Object.is(NaN, number), true);
    }

    {
        const coerced = +0 === -0;
        const isSame = Object.is(+0, -0);
        equal(isSame, !coerced);
    }
    {
        const emptyString = '';
        const isSame = Object.is(emptyString, false);
        equal(isSame, false);
    }
    {
        const coerced = NaN == NaN;
        const isSame = Object.is(NaN, NaN);
        equal(isSame, !coerced);
    }
    {
        const isSame = Object.is(NaN, 0/0);
        equal(isSame, true);
    }

    {
        const areSame = false;
        equal(Object.is({}, {}), areSame);
    }
    {
        let map1 = new Map([[1, 'one']]);
        let map2 = new Map([[1, 'one']]);
        const areSame = Object.is(map1, map2);
        equal(areSame, false);
    }
}