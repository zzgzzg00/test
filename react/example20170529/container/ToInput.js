/**
 * Created by zhigang.zhang on 17-5-29.
 */
{
    const {connect}=ReactRedux;
    const {Input,toCreator}=window.example;
    const stateMapToProps=state=>({
        value:state.toStation
    });
    const dispatchMapToProps=dispatch=>({
        inputChangeHandle(e){
            dispatch(toCreator(e.target.value));
        }
    });
    const ToInput=connect(stateMapToProps,dispatchMapToProps)(Input);
    Object.assign(window.example,{ToInput});
}