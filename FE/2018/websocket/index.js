/**
 * users 存储的用户信息
 *  conn          链接句柄
 *  infos         留言/赞信息
 *  offlineInfos  离线信息
 *  online        是否在线
 *
 * 用户传输格式
 *  key           userid
 *      infos         留言/赞信息
 *      online        是否在线
 *      offlineInfos  离线信息
 *
 * type
 *  login 登录
 *      为登录用户传输所有用户信息
 *  friendlogin 有好友登录
 *      为其他在线用户传输登录用户的信息
 *  support/say
 *      为发送和目标用户传输信息
 *  friendlogout 登出
 *      为其他用户传输退出登录的用户信息
 * */
var ws = require("nodejs-websocket");
const users={};
function formatDig(num){
    return num>9?num:'0'+num;
}
function formatDate(date){
    return `${date.getFullYear()}${formatDig(date.getMonth()+1)}${formatDig(date.getDate())}${formatDig(date.getHours())}${formatDig(date.getMinutes())}${date.getSeconds()}`;
}
//找到所有在线用户信息
function converUsersInfo(users){
    const o={}
    Object.keys(users)
        .forEach(item=>{
            o[item]={
                infos:users[item].infos,
                online:users[item].online,
                offlineInfos:users[item].offlineInfos
            };
        });
    return o;
}
//为新登录用户返回所有相关用户信息 为已登录用户返回新登录用户信息
function responseAllOnLineUser(userid,userDB,type,time){
    const allReleationUser=findReleationUser(userid,userDB);
    const allOnlineUsers=converUsersInfo(allReleationUser);
    Object.keys(allReleationUser).forEach(function(key){
        if(key == userid){
            sendMessage(userDB[key],{
                status:0,
                type,
                msg:{time:time,users:allOnlineUsers,offlineInfos:allOnlineUsers[key].offlineInfos}
            });
        }else{
            sendMessage(userDB[key],{
                status:0,
                type:'friendlogin',
                msg:{time:time,friend:{[userid]:allOnlineUsers[userid]}}
            });
        }
    });
}
function responseAllOffLine(userid,userDB,time){
    const allReleationUser=findReleationUser(userid,userDB);
    Object.keys(allReleationUser).forEach(function(key){
        if(key != userid){
            sendMessage(userDB[key],{
                status:0,
                type:'friendlogout',
                msg:{time:time,friend:{[userid]:userDB[userid].infos}}
            });
        }
    });
}
//找到所有相关用户
function findReleationUser(userid,userDB){
    return userDB;
}
//为已有用户添加信息
function addInfo(user,type,from,time,say=''){
    if(!user){
        return false;
    }
    user[user.online?'infos':'offlineInfos'].push({
        type,
        from,
        say,
        time
    });
    return true;
}
//修改未读消息为已读
function editReadedInfo(user){
    if(!user || !user.online){
        return;
    }
    const {offlineInfos}=user;
    user.infos.push(...offlineInfos);
    user.offlineInfos=[];
}
//登录/注册
function registerOrLogin(userDB,userid,conn){
    if(!userDB[userid]){
        userDB[userid]={
            conn:conn,
            infos:[],
            offlineInfos:[{tip:'注册成功'}],
            online:true
        };
    }else if(!userDB[userid].online){
        Object.assign(userDB[userid],{conn,online:true});
    }
}
function logout(userDB,conn){
    return Object.keys(userDB).find(key=>{
        if(userDB[key].conn==conn){
            userDB[key].online=false;
            userDB[key].conn=null;
            return true;
        }
    });
}
function sendMessage(user,obj){
    if(!user || !user.online){
        return false;
    }
    user.conn.send(JSON.stringify(obj));
    return true;
}
var server = ws.createServer(function(conn){
    conn.on("text", function (str) {
        const time=formatDate(new Date());
        const obj=JSON.parse(str);
        const {from,to,type,say=''}=obj;
        switch(type){
            case 'login':
                registerOrLogin(users,from,conn);
                responseAllOnLineUser(from,users,type,time);
                editReadedInfo(users[from]);
                break;
            case 'support':
            case 'say':
                const addResult=addInfo(users[to],type,from,time,say);
                if(addResult){
                    const sendFeed=sendMessage(users[to],{
                        status:0,
                        type,
                        msg:{from,say,time}
                    });
                    if(sendFeed){
                        sendMessage(users[from],{
                            status:0,
                            type,
                            msg:{to,say,time}
                        });
                    }else{
                        sendMessage(users[from],{
                            status:0,
                            type,
                            msg:{tip:'用户已离线，上线后可看到您发送的消息'}
                        })
                    }
                }else{
                    sendMessage(users[from],{
                        status:0,
                        type,
                        msg:'访问的用户不存在'
                    })
                }
                break;
        }
    })
    conn.on("close", function (code, reason) {
        const stopId=logout(users,conn);
        if(!stopId){
            return;
        }
        const time=formatDate(new Date());
        responseAllOffLine(stopId,users,time);
    });
    conn.on("error", function (code, reason) {
        console.log(reason,code)
    });
}).listen(8028);