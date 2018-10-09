interface IFunc{
    (key:string):string;
}
let ifunc:IFunc=function(key:string){return key};
ifunc('a');

let funArr:IFunc[]=[function(key){return key},function(key){return key}];
funArr[1]('');

interface IFunObj{
    name:string;
    fun1(key:string):string;
    fun2:(key:number)=>number;
}
let objfun:IFunObj={
    name:'1',
    fun1(key){return key},
    fun2(key){return key}
}
