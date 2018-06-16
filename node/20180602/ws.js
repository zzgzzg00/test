const Koa=require('koa');
const router=require('koa-router')();
const WebSocket=require('ws');
const WebSocketServer=WebSocket.Server;
const wss=new WebSocketServer({
    port:3000
});
const app=new Koa();

wss.on('connection',ws=>{
    console.log('server start');
    ws.on('message',message=>{
        console.log('server accept:'+message);
        ws.send('have accepted:'+message);
        setTimeout(()=>ws.send('so?'),2000);
    })
});

app.use(async (ctx,next)=>{
   ctx.response.type='text/html';
   await next();
});

router.get('/cilent',async (ctx,next)=>{
    ctx.response.body=`
        <input id="send" />
        <script>
            const ws=new WebSocket('ws://localhost:3000/ws');
            ws.onmessage=data=>console.log(data.data);
            document.querySelector('#send').onchange=function(){
                ws.send(this.value);
            }
        </script>
    `;
});

app.use(router.routes());
app.listen(8889);
