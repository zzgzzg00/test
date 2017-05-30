/**
 * Created by zhigang.zhang on 17-5-30.
 */
{
    const showListCreator=()=>({type:'show',list:[]});
    const newListCreator=()=>({type:'new',list:[{
        url:'http://jj.com',
        name:'jjqs'
    },{
        url:'http://yn.com',
        name:'ynqs'
    },{
        url:'http://m.com',
        name:'mrf'
    },{
        url:'http://lp.com',
        name:'lprf'
    }]});
    const addListCreator=(list)=>({type:'add',list});
    const delListCreator=(list)=>({type:'del',list});
    const showAddStyle=()=>({type:'show_add_style'});
    const hideAddStyle=()=>({type:'hide_add_style'});
    Object.assign(window.example,{delListCreator,showListCreator,newListCreator,showAddStyle,hideAddStyle,addListCreator});
}