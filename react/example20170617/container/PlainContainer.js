/**
 * Created by zhigang.zhang on 17-6-17.
 */
{
    const {connect}=ReactRedux;
    const {plainActionCreater,Plain}=window;
    const stateMapToProps=function(state){
        return{
            lists:state.lists
        }
    }
    const dispatchMapToProps=function(dispatch){
        return{
            changeHandle(index,e){
                dispatch(plainActionCreater([{position:index,value:{show:true}}]));
            }
        }
    }
    const PlainContainer=connect(stateMapToProps,dispatchMapToProps)(Plain);
    Object.assign(window,{PlainContainer});
}