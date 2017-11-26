/**
 * Created by zhigang.zhang on 17-6-17.
 */
{
    const plainReduce=function(state=[],action){
        const {type,lists}=action;
        switch (type){
            case 'change':
                const t= [...state];
                for(let list of lists){
                    t[list.position]=list.value;
                }
                return t;
            default :
                return state;
        }
    }
    const plainActionCreater=(lists=>({type:'change',lists}));
    Object.assign(window,{plainReduce,plainActionCreater});
}