/**
 * Created by zhigang.zhang on 17-5-30.
 */
{
    const {delListCreator,Item,styleObjCreator,hideAddStyle,showAddStyle,urlCreator,nameCreator,addListCreator,store}=window.example;
    const {connect}=ReactRedux;
    const stateMapToProps=state=>({
        lists:state.lists,
        style:state.styleObj.list,
        addStyle:state.addStyle,
        addUrl:state.newUrl,
        addName:state.newName
    });
    const dispatchMapToProps=dispatch=>({
        clickHandle(e){
            dispatch(styleObjCreator('showSearch'));
        },
        addHandle(e){
            dispatch(showAddStyle());
        },
        addNewItemHandle(e){
            const list={
                name:store.getState().newName,
                url:store.getState().newUrl
            };
            dispatch(addListCreator(list));
            dispatch(hideAddStyle());
        },
        addUrlHandle(e){
            let v= e.target.value;
            dispatch(urlCreator(v));
        },
        addNameHandle(e){
            let v= e.target.value;
            dispatch(nameCreator(v));
        },
        delHandle(index,e){
            dispatch(delListCreator(index));
        }
    });
    const ListItem=connect(stateMapToProps,dispatchMapToProps)(Item);
    Object.assign(window.example,{ListItem});
}