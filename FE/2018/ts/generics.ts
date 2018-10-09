interface Gen1<T>{
    name:T,
    fun:(key:T)=>T
}
let g1:Gen1<number>={
    name:1,
    fun(key){return key}
}
g1.fun(1);
let g2:Gen1<number[]>={
    name:[1],
    fun(key){return key}
}
g2.fun([1]);

class Test<T>{
    name:T;
    constructor(name){
        this.name=name;
    }
    func(key:T){
        return key;
    }
}
let t1=new Test<number>(1);
t1.func(1);
let t2=new Test<number[]>([1]);
t2.func([1]);