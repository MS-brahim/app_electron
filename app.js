const electron = require('electron');
const { app, BrowserWindow } = electron

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 650,
        webPreferences: {
            nodeIntegration: true
        },
        resizable:false
    })
    
    win.loadFile('src/index.html');
    
    //win.setMenuBarVisibility(false)
}


app.on('ready', createWindow);    
// app.whenReady().then(createWindow)
    
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        }
    })
    
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})