const {ipcRenderer} = require('electron')
const from=document.getElementById('from'),
    to=document.getElementById('to'),
    date=document.getElementById('date');
const command=document.getElementById('command'),
    exec=document.getElementById('exec');
const show=document.getElementById('show');
const url='https://kyfw.12306.cn/otn/leftTicket/query'
document.getElementById('search').onclick=function(){
    const fromcode=stations[from.value],
        tocode=stations[to.value],
        datecode=date.value;
    const params={
        'leftTicketDTO.train_date' : datecode,
        'leftTicketDTO.from_station' : fromcode,
        'leftTicketDTO.to_station' : tocode,
        'purpose_codes' : 'ADULT'
    };
    const queryString=Object.keys(params).map(function(key){
        return key+'='+params[key];
    }).join('&');
    fetch(url+'?'+queryString,{credentials: "include"})
        .then(function(resp){
            return resp.json();
        })
        .then(function(data) {
            show.innerHTML=JSON.stringify(data,null,4);
        });
}
exec.onclick=function(){
    const commandstr=command.value;
    ipcRenderer.send('asynchronous-execcommand',commandstr);
}
ipcRenderer.on('asynchronous-reply', (event, arg) => {
    show.innerHTML=arg;
})