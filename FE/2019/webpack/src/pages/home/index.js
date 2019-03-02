import React,{useState} from 'react';
import './index.css';
const Home=({initCount})=>{
    const [count,setCount]=useState(initCount);
    return(
        <p className={'home'} onClick={()=>setCount(count+1)}>{count}</p>
    )
}
export default Home;