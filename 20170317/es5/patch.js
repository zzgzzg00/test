/**
 * Created by zhigang.zhang on 17-3-20.
 */
if(!Array.from){
    Array.from=function(e,fun){
        fun=fun||function(item){
            return item;
        }
        var arr=[];
        for(var i=0;i< e.length;i++){
            arr.push(fun(e[i],i));
        }
    }
}