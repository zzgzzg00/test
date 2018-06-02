const fs=require('fs');
fs.readFile('./process.js','utf-8',(err,data)=>{
    console.log(data);
});

/**
 * 当读取二进制文件时，不传入文件编码时，回调函数的data参数将返回一个Buffer对象。
 * 在Node.js中，Buffer对象就是一个包含零个或任意个字节的数组（注意和Array不同）。
 * */
fs.readFile('./process.js',(err,data)=>{
    console.log(data.toString('utf-8'));
});

const data=fs.readFileSync('./process.js','utf-8');
console.log(data);

const con=JSON.stringify({a:{b:1}},null,4);
fs.writeFile('./test.txt',con,error=>{
    if(!error){
        console.log('success');
    }else{
        console.log(error);
    }

    fs.stat('./test.txt',(err,data)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log(JSON.stringify(data,null,4));
        console.log(data.isFile());
        console.log(data.isDirectory());
    })
});