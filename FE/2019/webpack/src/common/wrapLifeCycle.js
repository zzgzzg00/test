import React,{Component} from 'react';
function wrapLifeCycle(Com){
    return class extends Component{
        componentDidMount(){
            console.log('mount');
        }
        render(){
            return(
                <Com {...this.props} />
            )
        }
    }
}
export {
    wrapLifeCycle
}