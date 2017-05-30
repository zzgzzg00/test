/**
 * Created by zhigang.zhang on 17-5-30.
 */
{
    const listReduce=function(state=[],action){
        const {type,list}=action;
        switch(type){
            case 'show':
                return state;
            default :
                return state;
        }
    }
    Object.assign(window.example,{listReduce});
}