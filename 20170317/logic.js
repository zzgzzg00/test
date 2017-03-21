/**
 * Created by zhigang.zhang on 17-3-20.
 */
{
    const listUrl='/search/joint.do';
    const map=new Map([
        ['飞机','&#xf010;'],
        ['火车','&#xf014;'],
        ['汽车','&#xf1f3;'],
        ['轮船','&#xf466;']
    ]);
    function initSuggest(){
        const suggests= [...document.querySelectorAll('[data-role="suggest"]')];
        //出发 到达用一个cache
        const cache= new SuggestCache();
        for(let suggest of suggests){
            new Suggest(suggest,{cache});
        }
    }
    function changeToIcon(data){
        for(let i of data){
            i.icon=map.get(i.type);
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
        changeToIcon(data);
        let str=repeat(data)`
                <div class="item">
                    <div class="icon">${'icon'}</div>
                    <div class="info">
                        <div class="from">
                            <p class="time">${'startTime'}</p>
                            <p class="city">${'startCity'}</p>
                        </div>
                        <div class="during">
                            <p class="usetime">${'duration'}</p>
                            <p class="seperate"></p>
                            <p>${'number'}</p>
                        </div>
                        <div class="to">
                            <p class="time">${'arriveTime'}</p>
                            <p class="city">${'arriveCity'}</p>
                        </div>
                    </div>
                    <div class="price">
                        <span>&yen;</span>${'price'}
                    </div>
                </div>`;
        return str;
    }
    function renderList(data){
        const arr=[];
        for(let container of data){
            let item=renderItem(container.items);
            arr.push(`
                    <div class='container'>
                    ${item}
                    </div>`);
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
            .then(data=>renderList(data));
            }
        }
    }

    function init(){
        initSuggest();
        bindEvents();

        //test code
        renderList([
            {
                'items':[{
                    'type':'火车',
                    'startTime':'11:44',
                    'startCity':'北京',
                    'duration':'22时44分',
                    'number':'K44',
                    'arriveTime':'02:23',
                    'arriveCity':'乌鲁木齐',
                    'price':'11.4'
                },{
                    'type':'飞机',
                    'startTime':'11:44',
                    'startCity':'北京',
                    'duration':'22时44分',
                    'number':'K44',
                    'arriveTime':'02:23',
                    'arriveCity':'乌鲁木齐',
                    'price':'12'
                },{
                    'type':'轮船',
                    'startTime':'11:44',
                    'startCity':'北京',
                    'duration':'22时44分',
                    'number':'K44',
                    'arriveTime':'02:23',
                    'arriveCity':'乌鲁木齐',
                    'price':'50'
                },{
                    'type':'汽车',
                    'startTime':'11:44',
                    'startCity':'北京',
                    'duration':'22时44分',
                    'number':'K44',
                    'arriveTime':'02:23',
                    'arriveCity':'乌鲁木齐',
                    'price':'50'
                }]
            },{
                'items':[{
                    'type':'火车',
                    'startTime':'11:44',
                    'startCity':'北京',
                    'duration':'22时44分',
                    'number':'K44',
                    'arriveTime':'02:23',
                    'arriveCity':'乌鲁木齐',
                    'price':'11.4'
                },{
                    'type':'飞机',
                    'startTime':'11:44',
                    'startCity':'北京',
                    'duration':'22时44分',
                    'number':'K44',
                    'arriveTime':'02:23',
                    'arriveCity':'乌鲁木齐',
                    'price':'12'
                }]
            },{
                'items':[{
                    'type':'火车',
                    'startTime':'11:44',
                    'startCity':'北京',
                    'duration':'22时44分',
                    'number':'K44',
                    'arriveTime':'02:23',
                    'arriveCity':'乌鲁木齐',
                    'price':'11.4'
                },{
                    'type':'飞机',
                    'startTime':'11:44',
                    'startCity':'北京',
                    'duration':'22时44分',
                    'number':'K44',
                    'arriveTime':'02:23',
                    'arriveCity':'乌鲁木齐',
                    'price':'12'
                }]
            }
        ]);
    }
    init();
}