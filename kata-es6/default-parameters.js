/**
 * Created by zhigang.zhang on 17-5-7.
 */
/**
 * 默认值只有为全等undefined时才会生效/执行函数
 *  默认值作用域
 *  惰性执行
 * */

title('basic');
{
    {
        let number = (int=0) => int;
        equal(number(), 0);
    }

    {
        let number = (int = 23) => int;
        const param = undefined;
        equal(number(param), 23);
    }

    {
        function xhr(method='GET') {
            return method;
        }
        equal(xhr('POST'), 'POST');
    }

    {
        let defaultValue=42;
        function xhr(method = `value: ${defaultValue}`) {
            return method;
        }
        equal(xhr(), 'value: 42');
        defaultValue = 23;
    }

    {
        let defaultValue=()=>1;
        function fn(value = defaultValue()) {
            return value;
        }
        equal(fn(), defaultValue());
    }
}