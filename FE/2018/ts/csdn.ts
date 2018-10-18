let funTest:(a:string,b:string)=>string;
//err
funTest=function(a:number,b){
    return a+b;
}
funTest('a','b');


