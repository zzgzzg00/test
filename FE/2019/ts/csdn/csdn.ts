function test(target){
    target.prototype.show=function show(){
        alert(2);
    }
}
@test
class Test{
    show(){

    }
}

let t=new Test();
t.show();

d='a';