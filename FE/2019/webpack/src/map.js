import React,{Component,Suspense,lazy} from 'react';
import ReactDOM from 'react-dom';
const Map=lazy(()=>import('./pages/map/index'));
import Loading from './pages/map/component/loading/index';
const App=props=>{
    return(
        <div>
            <Suspense fallback={<Loading />}>
                <Map />
            </Suspense>
        </div>
    )
}
ReactDOM.render(<App />,document.querySelector('#root'));
