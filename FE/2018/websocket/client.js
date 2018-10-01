let _id;
const listDOM=document.querySelector('#lists');
const logDOM=document.querySelector('#log');
let ws;
function createFriendList(users){
    const ids=[];
    const arr=Object.keys(users).map(function(id){
        const isonline=users[id].online;
        ids.push(id);
        return `<p id=${id} style="background-color: ${isonline?"":"gray"}">
                    <span>${id}</span>
                    <input placeholder="对TA说" />
                    <span data-id="${id}" data-role="say">发送</span> 
                    <span data-id="${id}" data-role="support">赞</span>
                </p>`;
    });
    return{
        listArr:arr,
        ids
    }
}
function setId(id){
    _id=id;
    ws = new WebSocket("ws://192.168.3.55:8028");
    ws.onopen = function(evt) {
        ws.send(JSON.stringify({from:_id,type:'login'}));
    };

    ws.onmessage = function(evt) {
        const data=JSON.parse(evt.data);
        const {from,to,say,tip}=data.msg;
        switch(data.type){
            case 'login':
                const {users,offlineInfos}=data.msg;
                const {listArr:arr}=createFriendList(users);
                listDOM.innerHTML=arr.join('');
                if(offlineInfos.length){
                    const offlineInfosArr=offlineInfos.map(({type,from,say,time,tip})=>{
                        if(type == 'support'){
                            return `<p>${from}在${time}赞了您</p>`;
                        }else if(type == 'say'){
                            return `<p>${from}在${time}给您留言:${say}</p>`;
                        }else if(tip){
                            return `<p>${tip}</p>`;
                        }
                    });
                    logDOM.insertAdjacentHTML('beforeend',offlineInfosArr.join(''));
                }
                break;
            case 'friendlogin':
                const {friend:loginfriend}=data.msg;
                Object.keys(loginfriend).forEach(id=>{
                    const friendDOM=document.getElementById(id);
                    if(friendDOM){
                        friendDOM.style.backgroundColor='transparent';
                    }else{
                        const {listArr:loginfriendList}=createFriendList(loginfriend);
                        listDOM.insertAdjacentHTML('beforeend',loginfriendList.join(''));
                    }
                    logDOM.insertAdjacentHTML('beforeend',`<p>${id}上线了</p>`);
                });
                break;
            case 'support':
                if(from){
                    logDOM.insertAdjacentHTML('beforeend',`<p>${from}赞了您</p>`);
                }else if(to){
                    logDOM.insertAdjacentHTML('beforeend',`<p>您赞了${to}</p>`);
                }else if(tip){
                    logDOM.insertAdjacentHTML('beforeend',`<p>${tip}</p>`);
                }
                break;
            case 'say':
                if(from){
                    logDOM.insertAdjacentHTML('beforeend',`<p>${from}对您说 ${say}</p>`);
                }else if(to){
                    logDOM.insertAdjacentHTML('beforeend',`<p>您对${to}说了 ${say}</p>`);
                }else if(tip){
                    logDOM.insertAdjacentHTML('beforeend',`<p>${tip}</p>`);
                }
                break;
            case 'friendlogout':
                const {friend:logoutfriend}=data.msg;
                Object.keys(logoutfriend).forEach(id=>{
                    const friendDOM=document.getElementById(id);
                    if(friendDOM){
                        friendDOM.style.backgroundColor='gray';
                    }else{
                        const {listArr:logoutfriendList}=createFriendList(logoutfriend[id]);
                        listDOM.insertAdjacentHTML('beforeend',logoutfriendList.join(''));
                    }
                    logDOM.insertAdjacentHTML('beforeend',`<p>${id}离线了</p>`);
                });
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