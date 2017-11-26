/**
 * Created by zhigang.zhang on 17-6-17.
 */
{
    const {combineReducers,createStore}=Redux;
    const {initState,plainReduce}=window;
    const reduce=combineReducers({
        lists:plainReduce
    });
    const store=createStore(reduce,initState);
    Object.assign(window,{store});
}