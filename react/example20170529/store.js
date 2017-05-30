/**
 * Created by zhigang.zhang on 17-5-29.
 */
{
    const {inputReduce,initState,styleObjReduce,listReduce}=window.example;
    const {combineReducers,createStore}=Redux;
    const reduce=combineReducers({
        fromStation:inputReduce('from'),
        toStation:inputReduce('to'),
        date:inputReduce('date'),
        styleObj:styleObjReduce,
        lists:listReduce
    });
    const store=createStore(reduce,initState);
    window.example.store=store;
}