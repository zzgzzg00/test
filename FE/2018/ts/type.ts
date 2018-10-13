/*
* type 别名不能被extends implements
* **/
type Props={
    name:string;
    age?:number;
}
type S="1"|1;
type Props2<T>={
    name:T;
}
let dprops:Props={
    name:'a'
}
let dprops2:Props2<number>={
    name:1
}
let d2s:S=1;