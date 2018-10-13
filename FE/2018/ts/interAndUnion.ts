interface A{
    name:string;
}
interface B{
    age:number;
}
let c:A&B;
c={
    name:'1',
    age:1
}
let d:A|B|boolean;
d=true;