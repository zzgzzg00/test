/**
 * Created by zhigang.zhang on 17-5-29.
 */
{
    const inputReduce=function(name){
        return function(state='',action){
            const {type,text}=action;
            switch(type){
                case `change_${name}`:
                    return text;
                default:
                    return state;
            }
        }
    }
    window.example.inputReduce=inputReduce;
}