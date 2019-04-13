import './index.css';
import React,{useEffect,useState} from 'react';
import {createMarkAndPolyline} from './tools';
const Map=props=>{
    const [map,setMap]=useState(null);
    useEffect(()=>{
        setMap(new AMap.Map('container',{
            zoom:8,
            center: [116.357652,40.042996],
            viewMode:'3D',
            resizeEnable: true
        }));
    },[]);
    useEffect(()=>{
        const {polyline,markers}=createMarkAndPolyline(
            [[113.304071,40.120784],[116.322056,39.89491], [116.990989,36.670856],[121.382846,37.548309]],
            ['大同站','北京西站','济南站','烟台站']
        );
        if(map){
            map.add(polyline);
            markers.forEach(marker=>map.add(marker));
            map.setFitView();
        }
        window.map=map;
    },[map]);
    return(
        <div>
            <div className={'change_line'}>change</div>
            <div id="container"></div>
        </div>
    )
}
export default Map;
