/**
 * Created by zhigang.zhang on 17-5-29.
 */
{
    const fromCreator=(text)=>({type:'change_from',text});
    const toCreator=(text)=>({type:'change_to',text});
    const dateCreator=(text)=>({type:'change_date',text});
    const urlCreator=(text)=>({type:'change_new_url',text});
    const nameCreator=(text)=>({type:'change_new_name',text});
    Object.assign(window.example,{fromCreator,toCreator,dateCreator,urlCreator,nameCreator});
}