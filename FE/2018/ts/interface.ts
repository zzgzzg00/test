interface BaseInterface{
    name:string;
}
function baseFunc(test:BaseInterface):void{

}
baseFunc({} as BaseInterface);
baseFunc({name:"a",sex:1} as BaseInterface);
const bad={name:"a",sex:1};
baseFunc(bad);
const good:BaseInterface={name:"a",sex:2} as BaseInterface;
baseFunc(good);

interface BaseOptionInterface{
    name:string;
    age?:number;
}
function baseFuncOption(test:BaseOptionInterface):void{

}
baseFuncOption({name:"a"});
baseFuncOption({name:"a",sex:1} as BaseOptionInterface);

interface ExtraInterface{
    name:string;
    [key:string]:any
}
function extraFunc(test:ExtraInterface):void{

}
extraFunc({name:'a',sex:1})

interface ReadonlyInterface{
    readonly x:number;
}
let readonlyObj:ReadonlyInterface={
    x:10
};
// readonlyObj.x=11;

let arr:ReadonlyArray<number>=[1,2,3];
// arr.push(4);

interface FuncInterface{
    (key:string,value:number):any;
}
let func:FuncInterface;
func=(name,age)=>({[name]:age});
func('a',1);

interface FunObjInterface{
    name:string,
    func(key:string):boolean
}
let obj:FunObjInterface;
obj={
    name:'11',
    func(key){return true}
}

interface ClassInterface{
    key:string;
    func(key:string):boolean;
}
class ImplementClass implements ClassInterface{
    key:string;
    constructor(name:string,age:number){
        this.key=name;
    }
    func(str){
        return true;
    }
}
let d=new ImplementClass('a',1);

interface E1{
    name:string;
}
interface E2{
    age:number;
}
interface E3 extends E1,E2{
    sex:number;
}
let mis:E3={
    name:'1',
    age:10,
    sex:1
}
