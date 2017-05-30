/**
 * Created by zhigang.zhang on 17-5-29.
 */
{
    const {connect}=ReactRedux;
    const {FromInput,ToInput,DateInput,SubmitContainer}=window.example;
    const Form=props=>(
        <form
            style={props.style}
            method="post"
            action='/'
        >
            <FromInput />
            <ToInput />
            <DateInput />
            <SubmitContainer value="提交" />
        </form>
    );
    const stateMapToProps=state=>({
        style:state.styleObj.search
    });
    const dispatchMapToProps=dispatch=>({});
    const FormContainer=connect(stateMapToProps,dispatchMapToProps)(Form);
    Object.assign(window.example,{FormContainer});
}