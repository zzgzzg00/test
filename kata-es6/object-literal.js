/**
 * Created by zhigang.zhang on 17-5-7.
 */
/**
 * es6对象属性可以通过[]进行设置
 *  get [xxx](){return 1}
 * get 可以被删除
 * set函数 必须有形参
 * */

title('basic');
{
    const x = 1;
    const y = 2;
    {
        const short = {x};
        deepEqual(short, {x:1});
    }
    {
        const short = {x, y: y};
        deepEqual(short, {x: x, y: y});
    }
    const func = () => func;
    {
        const short = {func};
        deepEqual(short, {func: func});
    }

    {
        const short = {otherKey:func};
        deepEqual(short, {otherKey: func});
    }

    {
        const short = {
            inlineFunc(){return 'I am inline'}
        };
        deepEqual(short.inlineFunc(), 'I am inline');
    }
}

title('computed-property');
{
    {
        const propertyName = 'x';
        const obj = {[propertyName]: 2};
        equal(obj.x, 2);
    }

    {
        const key = 'func';
        const obj = {[key](){return  'seven'}};
        equal(obj.func(), 'seven');
    }

    {
        const getName = () => 'propertyName';
        const obj = {[getName()]() {return 'seven'}};
        equal(obj.propertyName(), 'seven');
    }

    {
        const what = 'Name';
        const obj = {['property' + what]: null};
        equal('propertyName' in obj, true);
    }

    {
        const obj = {
            get ['key']() {return 1}
        };
        equal(obj.key, 1);
    }
}

title('getter');
{
    {
        const obj = {
            get x() { return 'ax'; }
        };

        equal(obj.x, 'ax');
    }

    {
        const obj = {
            x() { return 'ax'; }
        };
        equal(obj.x(), 'ax');
    }


    {
        const keyName = 'x';
        const obj = {
            get [keyName]() { return 'ax'; }
        };
        equal(obj.x, 'ax');
    }

    {
        const obj = {
            get x() { return 'ax'; }
        };
        delete obj.x;
        equal(obj.x, void 0);
    }
}

title('setter');
{
    {
        let theX = null;
        const obj = {
            set x(newX) { theX = newX; }
        };

        obj.x = 'the new X';
        equal(theX, 'the new X');
    }
    {
        let setterCalledWith = void 0;
        const obj = {
            set x(param) {
                if (arguments.length === 1) {
                    setterCalledWith = arguments[0];
                }
            }
        }
        equal(obj.x = 'new value', setterCalledWith);
    }
    {
        const publicPropertyName = 'x';
        const privatePropertyName = '_' + publicPropertyName;
        const obj = {
            set [publicPropertyName](num){
                this.__=num;
            },
            get [privatePropertyName](){
                return this.__;
            }
        };
        obj.x = 'axe';
        equal(obj._x, 'axe');
    }
}