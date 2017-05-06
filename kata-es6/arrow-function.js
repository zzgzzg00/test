/**
 * Created by zhigang.zhang on 17-5-6.
 */
/**
 * 箭头函数
 *   没有this arguments new.target
 *   不能new bind
 * */
title('basic');
{
    {
        const func = () => {
            return 'I am func';
        };
        log(func());//'I am func';
    }

    {
        const func = () => {return 'I return too'};
        log(func());//'I return too';
    }

    {
        const func = param => param - 1;
        log(func(25));//24;
    }

    {
        const func = (param,param1) => `${param} + ${param1}`;
        log(func(23, 42));//23+42
    }

    {
        var func = () => ({iAm: 'an object'});
        log(func());//{iAm: 'an object'};
    }
}

title('binding');
{
    class LexicallyBound {
        getFunction() {
            return () => this;
        }
        getArgumentsFunction() {
            return ()=>arguments;
        }
    }
    {
        const bound = new LexicallyBound();
        const fn = bound.getFunction();
        log(fn()===bound);//true
    }

    {
        const bound = new LexicallyBound();
        const fn = bound.getFunction();
        const anotherObj = {};
        log(fn.call(anotherObj)===bound);//true
    }

    {
        const bound = new LexicallyBound();
        const fn = bound.getArgumentsFunction();
        log(fn(1, 2).length);//0
    }
}