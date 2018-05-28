function wrapConsumer(Component,Consumer){
    return props=>(
        <Consumer>
            {
                data=>{
                    const finalProps={...props,...data};
                    return(
                        <Component {...finalProps} />
                    )
                }
            }
        </Consumer>
    )
}
export default wrapConsumer;