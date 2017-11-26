/**
 * Created by zhigang.zhang on 17-5-6.
 */
/**
 * let/const
 *  块级作用域 不能重复定义 暂时性死区
 * */
title('const');
{
    const notChangeable = 23;
    {
        const constNum = 0;
        errorRun(()=>constNum = 1,()=>log('const error'));
        log(constNum);//0
    }

    {
        log(notChangeable);//23
    }

    {
        const arr = [42, 23];
        arr[0] = 0;
        log(arr[0])//0;
    }

    {
        const obj = {x: 1};
        obj.x = 2;
        log(obj.x);//2;
    }
}

title('let');
{
    {
        if (true) {
            let varX = true;
        }
        errorRun(()=>varX,()=>log('error'));//error;
    }

    {
        if (true) {
            var letX = true;
        }
        log(letX);//true
    }
}