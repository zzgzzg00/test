/**
 * Created by zhigang.zhang on 17-5-6.
 */
{
    const STYLES={
        get title(){
            return 'color:blue;font-size:14px;font-weight:bolder;background-color:yellow;'
        },
        get subtitle(){
            return 'color:red;font-size:12px;background-color:yellow;'
        }
    }
    Object.assign(window,{
        title:function(title){
            console.log(`%c ${title}`,`${STYLES.title}`);
        },
        log:function(log){
            console.log(log);
        },
        'subtitle':function(title){
            console.log(`%c ${title}`,`${STYLES.subtitle}`);
        },
        equal:function(a,b){
            if(a!=b){
                throw new Error(`${a} not equal ${b}`);
            }
        },
        ok:function(result){
            if(!result){
                throw new Error(`${result} is not true`)
            }
        },
        deepEqual:function(a,b){
            a=JSON.stringify(a);
            b=JSON.stringify(b);
            if(a!=b){
                throw new Error(`${a} not deep equal ${b}`);
            }
        },
        errorRun:function(fun,callback){
            try{
                fun();
            }catch (e){
                callback();
            }
        }
    });
}