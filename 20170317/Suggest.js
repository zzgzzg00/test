/**
 * Created by zhigang.zhang on 17-3-17.
 */
{
    const suggestUrl='http://train.qunar.com/qunar/chezhanSuggest.jsp';
    const suggertErrorTip='<p class="active error">暂无收录</p>';

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
            value=v?Array.from({length:21},(item,index)=>`test${index}`):'';
        //  value=[];

            if(value){
                return Promise.resolve(value);
            }
            return fetch(`${suggestUrl}?key=${v}&station=${me.station}`)
                .then(response=>response.json())
                .then(data=>{this.cache.put(data);return data});
        }
        createList(data=[],page=0){
            const me=this;
            const items=data.slice(page*me.countPerAge,(page+1)*me.countPerAge)
                .map((item,index)=>`<p class=${index==0?'active':''}>${item}</p>`)
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
                        me.inputDom.value=target.innerHTML;
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
}