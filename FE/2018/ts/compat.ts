interface Named{
    name:string;
}
class Test{
    name:string;
    age:number;
    constructor(){
        this.name='a';
        this.age=1;
    }
}
let n:Named;
n=new Test();
