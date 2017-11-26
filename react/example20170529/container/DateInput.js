/**
 * Created by zhigang.zhang on 17-5-29.
 */
{
    const {connect}=ReactRedux;
    const {Input,dateCreator}=window.example;
    const stateMapToProps=state=>({
        value:state.date
    });
    const dispatchMapToProps=dispatch=>({
        inputChangeHandle(e){
            dispatch(dateCreator(e.target.value));
        }
    });
    const DateInput=connect(stateMapToProps,dispatchMapToProps)(Input);
    Object.assign(window.example,{DateInput});
}