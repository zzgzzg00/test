/**
 * Created by zhigang.zhang on 17-5-30.
 */
{
    const {Item}=window.example;
    const {connect}=ReactRedux;
    const stateMapToProps=state=>({
        lists:state.lists,
        style:state.styleObj.list
    });
    const dispatchMapToProps=dispatch=>({});
    const ListItem=connect(stateMapToProps,dispatchMapToProps)(Item);
    Object.assign(window.example,{ListItem});
}