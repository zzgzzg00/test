const {app, BrowserWindow,net,ipcMain,session,autoUpdater} = require('electron');
const appVersion = require('./package.json').version;
const os = require('os').platform();
const updateFeed = 'http://zzg.com:8081/update.json';
let win;
if (require('electron-squirrel-startup')) return;
function createWindow () {
    // 创建浏览器窗口。
    win = new BrowserWindow({
        fullscreen:true,
        webSecurity:false,
        frame:false,
        simpleFullscreen:true,
        webPreferences:{
            nodeIntegration:true,
            session:true,
            webSecurity:false
        }
    });
    win.loadURL('https://zzgzzg00.github.io/FE/2018/elec/electest.html',{
        disablewebsecurity:true,
        nodeintegration:true,
        httpreferrer:"http://cheng.guru"
    });

    // 打开开发者工具
    win.webContents.openDevTools();
    autoUpdater.setFeedURL(updateFeed);
    autoUpdater.quitAndInstall();
    win.on('closed', () => {
        win = null
    })
    ipcMain.on('asynchronous-message', (event, arg) => {
        console.log(arg) // prints "ping"
        event.sender.send('asynchronous-reply', 'pong')
    })
    ipcMain.on('asynchronous-execcommand', (event, arg) => {
        const exec=new Function('require,win,webContents',arg);
        console.log(11,event.sender);
        exec(require,win,win.webContents);
    })
}
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})