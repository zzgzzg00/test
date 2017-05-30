/**
 * Created by zhigang.zhang on 17-5-29.
 */
{
    const {connect}=ReactRedux;
    const {store,Submit,styleObjCreator,showListCreator}=window.example;
    const stateMapToProps=state=>({

    });
    const dispatchMapToProps=dispatch=>({
        submitHandle(e){
            e.preventDefault();
            dispatch(styleObjCreator('showList'));
        }
    });
    const SubmitContainer=connect(stateMapToProps,dispatchMapToProps)(Submit);
    Object.assign(window.example,{SubmitContainer});
}