/**
 * Created by zhigang.zhang on 17-6-17.
 */
{
    const Plain=function(props){
        const {lists}=props;
        const arr=[];
        for(let [index,list] of lists.entries()){
            arr.push(<li
                        className={list.show?'':'hide'}
                        onClick={props.changeHandle.bind(null,index)}
                    ></li>);
        }
        return (<ul>{arr}</ul>);
    }
    Object.assign(window,{Plain});
}