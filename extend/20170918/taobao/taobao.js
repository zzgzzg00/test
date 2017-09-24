/**
 * Created by zhigang.zhang on 17-9-23.
 */
document.body.insertAdjacentHTML('beforebegin','<div class="inject js_inject">已注入</div>');
const divs=[];
window.onload=function(){
    const total=document.querySelector('.total').innerHTML,
          totalPage=parseInt(total.match(/\d+/)),
          tipDom=document.querySelector('.js_inject'),
          nowPage=document.querySelector('.item.active>span').innerHTML<<0;

    function tip(tipContent){
        tipDom.innerHTML=tipContent;
    }

    function nextClick(){
        const next=document.querySelector('.item.next>a');
        next.click();
    }

    function collectBySing(){
        return document.querySelectorAll('[data-category]');
    }

    function store(results){
        divs.push(...results);
    }

    function save(){
        return new Promise(function(resolve){
            nextClick();
            window.setTimeout(function(){
                resolve(collectBySing());
            },1000);
        });
    }

    async function getNextPage(totalPage){
        var arr= [...collectBySing()];
        tip(`抓取第${nowPage}页`)
        for(let i=nowPage+1;i<=totalPage;i++){
            tip(`抓取第${i}页`);
            const result=await save();
            arr.push(...result);
        }
        return arr;
    }

    function getInfosFromDivDOMArrs(divarrs){
        return divarrs.map(function(item){
            return item.querySelector('a').href;
        });
    }
    function collectAll(){
        getNextPage(totalPage)
            .then(function(divarrs){
                return getInfosFromDivDOMArrs(divarrs);
            })
            .then(function(strarrs){
                chrome.extension.sendRequest(strarrs, function(response) {
                    console.log(response);
                });
            })
    }
    collectAll();
}