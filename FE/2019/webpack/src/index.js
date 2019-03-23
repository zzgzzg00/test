import React,{Component,Suspense} from 'react';
import ReactDOM from 'react-dom';
const Home=React.lazy(()=>import('./pages/home/index'));
import {wrapLifeCycle} from './common/wrapLifeCycle';
const WHome=wrapLifeCycle(Home);
const App=props=>(
    <Suspense fallback={<div>loading</div>}>
        <WHome initCount={10} />
    </Suspense>
)
ReactDOM.render(<App />,document.querySelector('#root'));
