const Koa=require('koa');
const app=new Koa();
/**
 * 参数ctx是由koa传入的封装了request和response的变量，我们可以通过它访问request和response，
 * next是koa传入的将要处理的下一个异步函数。
 *
 * next
 * koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，
 * 然后用await next()来调用下一个async函数。
 * 我们把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能。
 * */
app.use(async (ctx,next)=>{
    console.log(`${ctx.request.method}`);
    await next();
});
app.use(async (ctx,next)=>{
    await next();
    ctx.response.type='text/html';
    // ctx.response.body='<h1>Hello, koa2!</h1>';
});
app.use(async (ctx,next)=>{
    const path=ctx.request.path;
    if(path == '/test1'){
        ctx.response.body='<h1>test1!</h1>';
    }else{
        await next();
    }
});
app.use(async (ctx,next)=>{
    const path=ctx.request.path;
    if(path == '/test2'){
        ctx.response.body='<h1>test2!</h1>';
    }else{
        await next();
    }
});
app.listen(8889);