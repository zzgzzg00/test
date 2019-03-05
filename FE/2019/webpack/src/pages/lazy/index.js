import React,{useState} from 'react';
const Lazy=props=>{
    const [count,setCount]=useState(0);
    return(
        <span onClick={()=>setCount(count+1)}>{count}</span>
    )
}
export default Lazy;