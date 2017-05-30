/**
 * Created by zhigang.zhang on 17-5-30.
 */
{
    const {Component}=React;
    class Item extends Component{
        render(){
            const arrs=this.props.lists;
            const lists=arrs.map(item=>(<li><a href={item.url}>{item.name}</a></li>));
            return (
                <ul style={this.props.style}>{lists}</ul>
            )
        }
    }
    Object.assign(window.example,{Item});
}