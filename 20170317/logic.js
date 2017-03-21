/**
 * Created by zhigang.zhang on 17-3-20.
 */
{
    const listUrl='/search/joint.do';
    const icons=['','&#xf010;','&#xf014;','&#xf1eb;','&#xf466;'];
    function initSuggest(){
        const suggests= [...document.querySelectorAll('[data-role="suggest"]')];
        //出发 到达用一个cache
        const cache= new SuggestCache();
        for(let suggest of suggests){
            new Suggest(suggest,{cache});
        }
    }
    function translateData(data){
        for(let i of data){
            i.icon=icons[i.lineType];
            i.price= parseFloat(i.price).toFixed(2);
        }
    }
    function repeat(data){
        let strArr=[];
        return function(strs,...params){
            for(let i of data){
                strArr.push(String.raw({raw:strs},...params.map(item=>i[item])));
            }
            return strArr.join('');
        }
    }
    function renderItem(data){
        translateData(data);
        let str=repeat(data)`
                <div class="item">
                    <div class="icon">${'icon'}</div>
                    <div class="info">
                        <div class="from">
                            <p class="time">${'dptTime'}</p>
                            <p class="city">${'dpt'}</p>
                        </div>
                        <div class="during">
                            <p class="usetime">${'intervalTimeDesc'}</p>
                            <p class="seperate"></p>
                            <p>${'lineNo'}</p>
                        </div>
                        <div class="to">
                            <p class="time">${'arrTime'}</p>
                            <p class="city">${'arr'}</p>
                        </div>
                    </div>
                    <div class="price">
                        <span>&yen;</span>${'price'}
                    </div>
                </div>`;
        return str;
    }
    function renderList(data=[]){
        const arr=[];
        if(data.length){
            for(let container of data){
                let item=renderItem(container.transLineList);
                arr.push(`
                        <div class='container'>
                        ${item}
                        </div>`);
            }
        }else{
            arr.push('<p class="noresult"><span>&#xe148;</span>没有可查询的数据</p>');
        }
        document.querySelector('[data-role="list"]').innerHTML=arr.join('');
    }
    function bindEvents(){
        const suggetInput= [...document.querySelectorAll('[data-role="input"]')];
//        const jointType=document.querySelector('[data-role="jointType"]');
        const cityList= [...document.querySelectorAll('[data-role="citylist"]')];
        //换
        document.querySelector('[action-type="exchange"]').onclick=function(e){
            e.preventDefault();
            [suggetInput[1].value,suggetInput[0].value]= [...suggetInput.map(item=>item.value)];
        }
        document.querySelector(':root').onclick=function(){
            cityList.forEach(function(item,index){
                if(!item.classList.contains('hide')){
                    let active=item.querySelector('.active');
                    if(!active.classList.contains('error')){
                        suggetInput[index].value=active.innerHTML;
                        suggetInput[index].parentNode.classList.remove('invaild');
                    }else{
                        suggetInput[index].value='';
                    }
                    item.classList.add('hide');
                }
            });
        }
        document.querySelector('[data-role="search"]').onclick=function(e){
            const params=[];
            let flag=true;
            suggetInput.forEach(function(item){
                if(!item.value){
                    item.parentNode.classList.add('invaild');
                    flag=false;
                    return false;
                }
                params.push(`${item.getAttribute('name')}=${item.value}`);
            });
//            const joinTypeArr=[];
//            for(let i=0;i<jointType.length;i++){
//                if(jointType[i].selected){
//                    joinTypeArr.push(jointType[i].value);
//                }
//            }
            if(flag){
                fetch(`${listUrl}?${params.join('&')}&jointType=${'0'}`)
                    .then(response=>response.json())
                    .then(data=>renderList(data.solutionList));
            }
        }
    }

    function init(){
        initSuggest();
        bindEvents();

        //test code
        const testData={
            "ret": true,
            "solutionList": [
                {
                    "transLineList": [
                        {
                            "dpt": "北京",
                            "arr": "南京",
                            "dptTime": "10:01",
                            "arrTime": "12:11",
                            "lineNo": "G12321",
                            "price": "2311",
                            "lineType": 1,
                            "nodeTypeDesc": "飞机",
                            "intervalTimeDesc": "02时10分",
                            "intervalMileageDesc": "2312公里"
                        },
                        {
                            "dpt": "南京",
                            "arr": "甘肃",
                            "dptTime": "12:21",
                            "arrTime": "18:11",
                            "lineNo": "K9878",
                            "price": "131",
                            "lineType": 2,
                            "nodeTypeDesc": "火车",
                            "intervalTimeDesc": "05时50分",
                            "intervalMileageDesc": "312公里"
                        },
                        {
                            "dpt": "甘肃",
                            "arr": "石河子",
                            "dptTime": "18:21",
                            "arrTime": "20:11",
                            "lineNo": "",
                            "price": "26",
                            "lineType": 3,
                            "nodeTypeDesc": "汽车",
                            "intervalTimeDesc": "02时10分",
                            "intervalMileageDesc": "120公里"
                        }
                    ]
                },
                {
                    "transLineList": [
                        {
                            "dpt": "大连",
                            "arr": "上海",
                            "dptTime": "10:11",
                            "arrTime": "12:11",
                            "lineNo": "G12321",
                            "price": "2311",
                            "lineType": 4,
                            "nodeTypeDesc": "轮船",
                            "intervalTimeDesc": "02时10分",
                            "intervalMileageDesc": "1312公里"
                        },
                        {
                            "dpt": "上海",
                            "arr": "南京",
                            "dptTime": "12:11",
                            "arrTime": "18:11",
                            "lineNo": "K9878",
                            "price": "131",
                            "lineType": 2,
                            "nodeTypeDesc": "火车",
                            "intervalTimeDesc": "05时50分",
                            "intervalMileageDesc": "312公里"
                        },
                        {
                            "dpt": "甘肃",
                            "arr": "石河子",
                            "dptTime": "18:21",
                            "arrTime": "20:11",
                            "lineNo": "G81273",
                            "price": "26",
                            "lineType": 1,
                            "nodeTypeDesc": "飞机",
                            "intervalTimeDesc": "02时10分",
                            "intervalMileageDesc": "120公里"
                        }
                    ]
                }
            ],
            "errmsg": "无误",
            "errcode": -1
        };
        renderList(testData.solutionList);
    }
    init();
}