/**
 * Created by zhigang.zhang on 17-5-30.
 */
{
    const {Item,styleObjCreator,hideAddStyle,showAddStyle,urlCreator,nameCreator,addListCreator,store}=window.example;
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
        }
    });
    const ListItem=connect(stateMapToProps,dispatchMapToProps)(Item);
    Object.assign(window.example,{ListItem});
}