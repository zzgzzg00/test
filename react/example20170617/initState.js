/**
 * Created by zhigang.zhang on 17-6-17.
 */
{
    const initState={};
    var lists=[];
    for(var i=0;i<100;i++){
        lists.push({show:false});
    }
    Object.assign(initState,{lists});
    Object.assign(window,{initState});
}