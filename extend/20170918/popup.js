/**
 * Created by zhigang.zhang on 17-9-18.
 */
//document.querySelector('div').onclick=function(){
//        fetch('https://suggest.taobao.com/sug?code=utf-8&q=kuzi&_ksTS=1505957468225_2010&callback=jsonp2011&k=1&area=c2c')
//                .then(data=>data.text())
//                .then(data=>document.body.insertAdjacentText('beforeend',data));
//}
let id=0;
const container=document.querySelector('.js_container');
function template(id){
    return `
        <input class="input" placeholder="请输入搜索内容" id=${id} />
        <a class="del js_del" href="javascript:void 0;" data-id="${id}">删除</a>
    `
}
function add(){
    const html=template(id++);
    container.insertAdjacentHTML('beforeend',html);
    container.scrollTop=container.scrollHeight;
}
function del(e){
    const target= e.target;
    if(target.classList.contains('js_del')){
        const id=target.dataset.id;
        document.getElementById(id).outerHTML='';
        target.outerHTML='';
    }
}
function submit(){
    var values=[...document.querySelectorAll('input')]
        .map(function(item){
            return item.value;
        })
        .filter(function(item){
            return item.replace(/^\s+/,'').replace(/\s+$/,'').length>0
        });
    alert(values);
}
document.querySelector('.js_add').onclick=add;
document.querySelector('.js_submit').onclick=submit;
document.body.onclick=del;
