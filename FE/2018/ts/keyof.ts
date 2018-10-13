interface Test{
    name:string;
    age:number;
    test:(name:string)=>string;
}
class TestI implements Test{
    name:string;
    age:number;
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    test(str){
        return str;
    }
}
let t:keyof TestI='test';//只能为TestI的key：name|age|test

type Refl={
    [P in keyof TestI]:number
};
let refl:Refl={
    name:1,
    age:1,
    test:1
}