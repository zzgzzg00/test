class Test{
    name:string;
    private age:number;
    constructor(name:string='a'){
        this.name=name;
        this.age=10;
    }
}
const t=new Test();
console.log(t.name);
// console.log(t.age);

class Base{
    private name:string;
    constructor(name:string){
        this.name=name;
    }
}
class Son extends Base{
    protected readonly age:number;
    constructor(name:string){
        super(name);
        this.age=10;
    }
}
class Test2{
    private name:string;
    constructor(name:string){
        this.name=name;
    }
}
//存在类似java的类型转换
let b=new Base('a');
let s=new Son('a');
let t2=new Test2('a');
b=s;
// s=b;
// t2=b;
// b=t2;

abstract class ATest{
    public name:string;
    constructor(name:string){
        this.name=name;
    }
    abstract show():void;
}
class ITest extends ATest{
    constructor(name:string){
        super(name);
    }
    show():void{
        console.log(this.name);
    }
}
let it=new ITest('a');
// let at=new ATest('a');

let it2:ITest=new ITest('a');
let it3:typeof ITest=ITest;
