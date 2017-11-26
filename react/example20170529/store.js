/**
 * Created by zhigang.zhang on 17-5-29.
 */
{
    const {inputReduce,initState,styleObjReduce,listReduce,addStyleReduce}=window.example;
    const {combineReducers,createStore}=Redux;
    const reduce=combineReducers({
        fromStation:inputReduce('from'),
        toStation:inputReduce('to'),
        date:inputReduce('date'),
        styleObj:styleObjReduce,
        lists:listReduce,
        newUrl:inputReduce('new_url'),
        newName:inputReduce('new_name'),
        addStyle:addStyleReduce
    });
    const store=createStore(reduce,initState);
    window.example.store=store;
}