/**
 * Created by zhigang.zhang on 17-5-29.
 */
{
    const {connect}=ReactRedux;
    const {FromInput,ToInput,DateInput,Submit}=window.example;
    const Form=props=>(
        <form
            method="post"
            action='/'
        >
            <FromInput />
            <ToInput />
            <DateInput />
            <Submit value="提交" />
        </form>
    );
    window.example.Form=Form;
}