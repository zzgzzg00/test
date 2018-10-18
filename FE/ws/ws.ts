for(let i=0;i<=50;i++){
    setTimeout(function(){
        const ws:WebSocket = new WebSocket(`ws://100.81.136.57:8080/websocket/name${i}`);
        ws.onopen = function(evt) {
            ws.send(i);
        };
        ws.onmessage = function(evt) {
            console.log(`${evt.data}`);
        };
        ws.onclose = function(evt) {
            console.log(`Connection closed ${i}`);
        };
    },10*i);
}