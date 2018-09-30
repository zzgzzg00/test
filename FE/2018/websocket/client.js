let _id;
const listDOM=document.querySelector('#lists');
const logDOM=document.querySelector('#log');
let ws;
function setId(id){
    _id=id;
    ws = new WebSocket("ws://100.81.136.154:8028");
    ws.onopen = function(evt) {
        ws.send(JSON.stringify({from:_id,type:'login'}));
    };

    ws.onmessage = function(evt) {
        const data=JSON.parse(evt.data);
        const {from,to,say}=data.msg;
        switch(data.type){
            case 'login':
                const {all,newId}=data.msg;
                const arr=all.map(function(id){
                    return `<p>
                                <span>${id}</span>
                                <input placeholder="对TA说" />
                                <span data-id="${id}" data-role="say">发送</span> 
                                <span data-id="${id}" data-role="support">赞</span>
                            </p>`;
                });
                listDOM.innerHTML=arr.join('');
                break;
            case 'support':
                if(from){
                    logDOM.insertAdjacentHTML('beforeend',`<p>${from}赞了您</p>`);
                }else{
                    logDOM.insertAdjacentHTML('beforeend',`<p>您赞了${to}</p>`);
                }
                break;
            case 'say':
                if(from){
                    logDOM.insertAdjacentHTML('beforeend',`<p>${from}对您说 ${say}</p>`);
                }else{
                    logDOM.insertAdjacentHTML('beforeend',`<p>您对${to}说了 ${say}</p>`);
                }
                break;
        }
    };

    ws.onclose = function(evt) {
        console.log("Connection closed.");
    };
}
document.body.onclick=function(e){
    if(!ws){
        return;
    }
    const target=e.target;
    if(target.dataset.role == 'support'){
        const to=target.dataset.id;
        ws.send(JSON.stringify({from:_id,type:'support',to}));
    }
    if(target.dataset.role == 'say'){
        const to=target.dataset.id;
        const say=target.previousElementSibling.value;
        ws.send(JSON.stringify({from:_id,type:'say',to,say}));
    }
}