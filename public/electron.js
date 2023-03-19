const electron = require('electron');
const remoteMain = require('@electron/remote/main');
remoteMain.initialize();
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        center:true,
        resizable:true,
        movable:true,
        darkTheme:true,
        backgroundColor:'#7B435B',
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule:true,  
          contextIsolation: false,
    
        }
        
    
      })
    const startUrl = process.env.ELECTRON_START_URL || url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true
        });
    mainWindow.loadURL(startUrl);
    remoteMain.enable(mainWindow.webContents);

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.whenReady().then(createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});
app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
});