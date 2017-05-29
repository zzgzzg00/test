/**
 * Created by zhigang.zhang on 17-5-29.
 */
{
    const {connect}=ReactRedux;
    const {store,Submit}=window.example;
    const stateMapToProps=state=>({

    });
    const dispatchMapToProps=dispatch=>({
        submitHandle(e){
            e.preventDefault();
            console.log(store.getState());
        }
    });
    const SubmitContainer=connect(stateMapToProps,dispatchMapToProps)(Submit);
    Object.assign(window.example,{SubmitContainer});
}