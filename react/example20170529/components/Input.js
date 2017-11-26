/**
 * Created by zhigang.zhang on 17-5-29.
 */
{
    const Input=props=>(
        <input type={'text'}
            value={props.value}
            onChange={props.inputChangeHandle}
        />
    );
    window.example.Input=Input;
}