interface Test {
    width?: number;
    height?: number;
}

let t: Test;
let t1 = {};
let t2 = { width: 1,x:1 }
let t3 = { x: 1 }

t = t1;
t = t2;
//interface如果都是可选属性，变量需要至少与一个可选属性匹配
//t = t3;

interface Test2{

}
//interface为空对象时可以任意赋值
let t4: Test2 = { a: 1 };

interface Test3 {
    [x: string]: number;
}
let t5: Test3 = {
    a: 1
}