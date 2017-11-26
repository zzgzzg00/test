/**
 * Created by zhigang.zhang on 17-5-29.
 */
{
    const {connect}=ReactRedux;
    const {store,Submit,styleObjCreator,showListCreator,newListCreator}=window.example;
    const stateMapToProps=state=>({

    });
    const dispatchMapToProps=dispatch=>({
        submitHandle(e){
            e.preventDefault();
            Promise.resolve()
            .then(function(){
                dispatch(styleObjCreator('showList'));
                dispatch(newListCreator());
            });
        }
    });
    const SubmitContainer=connect(stateMapToProps,dispatchMapToProps)(Submit);
    Object.assign(window.example,{SubmitContainer});
}