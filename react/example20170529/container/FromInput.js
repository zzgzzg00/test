/**
 * Created by zhigang.zhang on 17-5-29.
 */
{
    const {connect}=ReactRedux;
    const {Input,fromCreator}=window.example;
    const stateMapToProps=state=>({
        value:state.fromStation
    });
    const dispatchMapToProps=dispatch=>({
        inputChangeHandle(e){
            console.log(e.target.value);
            dispatch(fromCreator(e.target.value));
        }
    });
    const FromInput=connect(stateMapToProps,dispatchMapToProps)(Input);
    Object.assign(window.example,{FromInput});
}