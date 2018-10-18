let map=new Map();
const url=new URL(location.href);
const key=url.searchParams.get('key');
for(let i=0;i<=200;i++){
    i=`${i}`.padStart(3,'0');
    const name=`name${key}${i}`;
    setTimeout(function(){
        const ws = new WebSocket(`ws://100.81.136.57:8080/websocket/${name}`);
        map.set(name,ws);
        ws.onopen = function(evt) {
            // ws.send(name);
            const domhtml=`
                <div>
                    ${name}
                    <input data-role="${name}" />
                    <input type="button" value="send" data-button="${name}"/>
                </div>
            `
            document.body.insertAdjacentHTML('beforeend',domhtml);
        };
        ws.onmessage = function(evt) {
            console.log(`${evt.data}`);
        };
        ws.onclose = function(evt) {
            console.log(`Connection closed ${name}`);
        };
    },10*i);
}
ws = new WebSocket("ws://10.86.42.94:8028");
ws.onopen = function(evt) {
    ws.send(JSON.stringify({from:'tests',type:'login'}));
};
document.body.onclick=function(e){
    const target=e.target;
    if(target.dataset.button){
        const name=target.dataset.button;
        const value=document.querySelector(`[data-role="${name}"]`).value;
        map.get(name).send(value);
    }
}