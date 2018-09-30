var ws = require("nodejs-websocket");
function formatDig(num){
    return num>9?num:'0'+num;
}
function formatDate(date){
    return `${date.getFullYear()}${formatDig(date.getMonth()+1)}${formatDig(date.getDate())}${formatDig(date.getHours())}${formatDig(date.getMinutes())}${date.getSeconds()}`;
}
const users={};
var server = ws.createServer(function(conn){
    conn.on("text", function (str) {
        const time=formatDate(new Date());
        const obj=JSON.parse(str);
        const {from,to,type,say=''}=obj;
        if(!users[from]){
            users[from]={
                conn:conn,
                infos:[]
            };
        }
        switch(type){
            case 'login':
                const _usersId=Object.keys(users);
                _usersId.forEach(function(key){
                    users[key].conn.send(JSON.stringify({
                        status:0,
                        type,
                        msg:{
                            all:_usersId,
                            newId:from,
                            time:time
                        }
                    }));
                });
                break;
            case 'support':
            case 'say':
                users[to].infos.push({
                    type,
                    from:from,
                    say,
                    time:time
                });
                users[to].conn.send(JSON.stringify({
                    status:0,
                    type,
                    msg:{
                        from:from,
                        say,
                        time:time
                    }
                }));
                users[from].conn.send(JSON.stringify({
                    status:0,
                    type,
                    msg:{
                        to:to,
                        say,
                        time:time
                    }
                }));
                break;
        }
    })
    conn.on("close", function (code, reason) {
        Object.keys(users).forEach(function(key){
            if(users[key] && users[key].conn==conn){
                users[key]=null;
            }
        })
    });
    conn.on("error", function (code, reason) {
        console.log(reason,code)
    });
}).listen(8028);
