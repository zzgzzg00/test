/**
 * Created by zhigang.zhang on 17-5-7.
 */
title('isinteger');
{
    const isTrue = (what) => equal(what, true);
    const isFalse = (what) => equal(what, false);
    {
        const whatType = 'function';
        equal(typeof Number.isInteger, whatType);
    }

    {
        const zero = 0;
        isTrue(Number.isInteger(zero));
    }
    {
        isTrue(Number.isInteger(0.000));
    }
    {
        const stringZero = '0';
        isFalse(Number.isInteger(stringZero));
    }
    {
        const rest = 0.88;
        isFalse(Number.isInteger(0.111 + rest));
    }
    {
        const oneOrNot = 0.5 + 0.2 + 0.3;
        isTrue(Number.isInteger(oneOrNot));
    }
    {
        const convertedToInt = parseInt('1.01');
        isTrue(Number.isInteger(convertedToInt));
    }
    {
        const numberOne = Number();
        isTrue(Number.isInteger(numberOne));
    }
    {
        const isit = Number.isInteger({});
        isFalse(isit);
    }
    {
        const isit = Number.isInteger(0.1);
        isFalse(isit);
    }
    {
        const isit = Number.isInteger(Number.MAX_VALUE);
        isTrue(isit);
    }
    {
        const isit = Number.isInteger(NaN);
        isFalse(isit);
    }
}