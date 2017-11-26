/**
 * Created by zhigang.zhang on 17-5-30.
 */
{
    const {Component}=React;
    class Item extends Component{
        render(){
            const arrs=this.props.lists;
            const lists=arrs.map((item,index)=>(
                <li>
                    <a href={item.url}>{item.name}</a>
                    <a href={'javascript:void(0)'}
                        onClick={this.props.delHandle.bind(null,index)}>删除</a>
                </li>
                )
            );
            return (
                <div style={this.props.style}>
                    <ul>{lists}</ul>
                    <p style={this.props.addStyle}>
                        <input
                            type={'text'}
                            value={this.props.addUrl}
                            onChange={this.props.addUrlHandle}
                        />
                        <input
                            type={'text'}
                            value={this.props.addName}
                            onChange={this.props.addNameHandle}
                        />

                        <input
                            type={'button'}
                            value={'增加'}
                            onClick={this.props.addNewItemHandle}
                        />
                    </p>
                    <input
                        type={'button'}
                        value={'back'}
                        onClick={this.props.clickHandle}
                    />
                    <input
                        type={'button'}
                        value={'add'}
                        onClick={this.props.addHandle}
                    />
                </div>
            )
        }
    }
    Object.assign(window.example,{Item});
}