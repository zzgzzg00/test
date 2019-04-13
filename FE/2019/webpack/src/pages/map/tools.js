const useMap=(path=[],name=[])=>{
        // const path = [ [113.304071,40.120784],[116.322056,39.89491], [116.990989,36.670856],[121.382846,37.548309]  ];
        // const name=['大同站','北京西站','济南站','烟台站'];
        // let index=0;
        // const len=path.length;
        // setInterval(()=>{
        //        map.setCenter(path[(++index)%len]);
        //        map.setZoom(index*2);
        // },10000);
        // map.setFitView();
};
function createMarkAndPolyline(path=[],name=[]){
    const polyline = new AMap.Polyline({
        path : path,
        strokeColor:'red'
    });
    const markers=path.map((item,index)=>{
        const marker=new AMap.Marker({
            position:item,
            content:`<div class="point">${index}</div>`,
            offset: new AMap.Pixel(-13, -30)
        });
        marker.setLabel({
            offset: new AMap.Pixel(-30, -30),
            content: `<div class='info'>${name[index]}</div>`,
            direction: 'right'
        });
        return marker;
    });
    return{
        polyline,
        markers
    }
}
export {
    createMarkAndPolyline
};