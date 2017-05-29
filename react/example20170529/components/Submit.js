/**
 * Created by zhigang.zhang on 17-5-29.
 */
{
    const Submit=props=>(
        <input
            type={'submit'}
            onClick={props.submitHandle}
            value={props.value}
        />
    );
    window.example.Submit=Submit;
}