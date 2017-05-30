/**
 * Created by zhigang.zhang on 17-5-30.
 */
{
    const listReduce=function(state=[],action){
        const {type,list}=action;
        switch(type){
            case 'show':
                return state;
            case 'new':
                return list;
            case 'add':
                return state.concat(list);
            default :
                return state;
        }
    }
    const addStyleReduce=function(state={display:'none'},action){
        const {type}=action;
        switch (type){
            case 'show_add_style':
                return {display:'inline-block'};
            case 'hide_add_style':
                return {display:'none'};
            default :
                return state;
        }
    }
    Object.assign(window.example,{listReduce,addStyleReduce});
}