process.nextTick(()=>console.log(1));
console.log(2);
console.log(3);
setTimeout(()=>console.log(4),1000);
//Node.js进程本身的事件就由process对象来处理。如果我们响应exit事件，就可以在程序即将退出时执行某个回调函数：
process.on('exit',()=>console.log('exit'));