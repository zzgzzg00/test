const Koa=require('koa');
const router=require('koa-router')();
const bodyParser=require('koa-bodyparser');
const env=require('./env');

const app=new Koa();
/**
 * bodyParser会讲参数绑定到ctx.request.body中
 * */
app.use(bodyParser());
app.use(async (ctx,next)=>{
   ctx.response.type='text/html';
   await next();
});
router.get('/test/:name',async (ctx,next)=>{
    ctx.response.body=`<h1>test-${ctx.params.name}</h1>`;
});
router.get('/',async (ctx,next)=>{
    ctx.response.body=`<h1>index</h1>`;
});
router.get('/form',(ctx,next)=>{
   ctx.response.body=`
       <form method="post" action="/post">
           <input name="name" />
           <input type="submit" value="submit" />
       </form>
   `;
});
router.post('/post',(ctx,next)=>{
    const name=ctx.request.body.name;
   ctx.response.body=env.render('temp.html',{name});
});

app.use(router.routes());
app.listen(8889);