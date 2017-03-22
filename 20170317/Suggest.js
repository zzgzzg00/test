/**
 * Created by zhigang.zhang on 17-3-17.
 */
{
    const suggestUrl='/search/suggest.do';
    const suggertErrorTip='<p class="active error">暂无收录</p>';
    const icons=['','&#xf010;','&#xf014;','&#xf1eb;','&#xf466;'];
    function throwError(str=''){
        throw new Error(str);
    }

    class SuggestCache{
        constructor(){
            this.cache={};
        }
        put(key,value){
            this.cache[key]=value;
        }
        get(key){
            return this.cache[key];
        }
    }

    class Suggest{
        constructor(containerDom=throwError('containerDom is required'),{cache=new SuggestCache(),timeInterval=50,countPerAge=5}={}){
            this.inputDom=containerDom.querySelector('[data-role="input"]');
            this.station=this.inputDom.dataset.station;
            this.listDom=containerDom.querySelector('[data-role="citylist"]');
            this.cache=cache;
            this.timeHandle=null;
            this.timeInterval=timeInterval;
            this.countPerAge=countPerAge;
            this.bindEvents();
        }
        fetchData(v){
            const me=this;
            let value=this.cache.get(v);

            //test code
//            value=v?Array.from({length:21},(item,index)=>`test${index}`):'';
        //  value=[];
            value=[
                {
                    "name": "北京西",
                    "ename": "BeiJing West",
                    "city": "北京",
                    "simplePy": "bj",
                    "fullPy": "beijing",
                    "nodeType": 2,
                    "clusterNodeName": "北京"
                },
                {
                    "name": "北京T2航空楼",
                    "ename": "BeiJing T2 Air Port",
                    "city": "北京",
                    "simplePy": "bjt2hkl",
                    "fullPy": "beijingt2hangkonglou",
                    "nodeType": 1,
                    "clusterNodeName": "北京"
                },
                {
                    "name": "北京公主坟汽车站",
                    "ename": "BeiJing GongZhuFen Coach Station",
                    "city": "北京",
                    "simplePy": "bjgzfqcz",
                    "fullPy": "beijinggongzhufenqichezhan",
                    "nodeType": 3,
                    "clusterNodeName": "北京"
                }
            ];

            if(value){
                return Promise.resolve(value);
            }
            return fetch(`${suggestUrl}?q=${v}&station=${me.station}&lat=''&lgt=''`)
                .then(response=>response.json())
                .then(data=>{this.cache.put(data.nodes);return data.nodes});
        }
        createList(data=[],page=0){
            const me=this;
            const items=data.slice(page*me.countPerAge,(page+1)*me.countPerAge)
                .map((item,index)=>`<p data-content=${item.name} class=${index==0?'active':''}>${item.name}<span class='suggest-icon'>${icons[item.nodeType]}</span></p>`)
                .join('');
            const pages=Math.ceil(data.length/me.countPerAge);
            const pagesStr=pages>1?
                Array.from({length:pages},(item,index)=>
                    `<a href='javascript:void(0);' class=${index==page?'disabled':'js-page'}>${index+1}</a>`)
                .join(''):'';
            this.listDom.classList.remove('hide');
            this.listDom.innerHTML=items+pagesStr || suggertErrorTip;
        }
        renderList(v,page=0){
            this.fetchData(v)
                .then(data=>this.createList(data,page))
                .catch(data=>this.listDom.innerHTML=suggertErrorTip)
        }
        bindEvents(){
            const me=this;
            const inputDom=this.inputDom,listDom=this.listDom;
            inputDom.oninput=inputDom.onpropertychange=function(e){
                const v=this.value;
                if(me.timeHandle){
                    window.clearTimeout(me.timeHandle);
                }
                me.timeHandle=window.setTimeout(me.renderList.bind(me,v),me.timeInterval);
            }
            listDom.onclick=function(e){
                let target= e.target;
                e.stopPropagation();
                if(target.tagName.toLowerCase()=='p'){
                    if(!target.classList.contains('error')){
                        me.inputDom.value=target.dataset.content;
                        me.inputDom.parentNode.classList.remove('invaild');
                    }else{
                        me.inputDom.value='';
                    }

                    me.listDom.classList.add('hide');
                }else if(target.classList.contains('js-page')){
                    let page=target.innerHTML-1;
                    me.renderList(inputDom.value,page);
                }
            }
            listDom.onmouseover=function(e){
                let target= e.target;
                if(target.tagName.toLowerCase()=='p'){
                    [...this.querySelectorAll('p')].forEach(item=>item.classList.remove('active'));
                    target.classList.add('active');
                }
            }
        }
    }
    window.SuggestCache=SuggestCache;
    window.Suggest=Suggest;
    window.icons=icons;
}