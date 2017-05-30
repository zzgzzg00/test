/**
 * Created by zhigang.zhang on 17-5-30.
 */
{
    const styleObjReduce=function(state={search:{display:'block'},list:{dispaly:'none'}},action){
        const {type}=action;
        switch (type){
            case 'showSearch':
                return {search:{display:'block'},list:{dispaly:'none'}};
            case 'showList':
                return {search:{display:'none'},list:{dispaly:'block'}};
            default :
                return state;
        }
    }
    Object.assign(window.example,{styleObjReduce});
}