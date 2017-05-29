/**
 * Created by zhigang.zhang on 17-5-29.
 */
{
    const fromCreator=(text)=>({type:'change_from',text});
    const toCreator=(text)=>({type:'change_to',text});
    const dateCreator=(text)=>({type:'change_date',text});
    Object.assign(window.example,{fromCreator,toCreator,dateCreator});
}