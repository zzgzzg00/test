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
                <div style={this.props.style}>
                    <ul>{lists}</ul>
                    <input
                        type={'button'}
                        value={'back'}
                        onClick={this.props.clickHandle}
                    />
                </div>
            )
        }
    }
    Object.assign(window.example,{Item});
}