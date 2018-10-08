let str:string='a';
let num:number=1;
let arr:number[]=[1,2,3];
let arr2:Array<number>=[1];
let tuple:[string,number]=['a',1,1];

enum Color{
    A,B,C
}
function enumTest(test:Color):void{
}
enumTest(Color.A);