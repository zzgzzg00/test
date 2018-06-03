const fs=require('fs');
const file='./test.txt';
const ws=fs.createWriteStream(file,'utf-8');
ws.write('just a test')
ws.write('test over');
ws.end();
const rs=fs.createReadStream(file,'utf-8');
/**
 * data事件可能会有多次，每次传递的chunk是流的一部分数据。
 * */
rs.on('data',chunk=>console.log(chunk));
rs.on('end',()=>console.log('end'));
rs.on('error',console.log);

// const prs=fs.createReadStream(file);
// const pws=fs.createWriteStream('./test2.txt');
// prs.pipe(ws);
