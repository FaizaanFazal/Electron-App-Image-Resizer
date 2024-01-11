const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');


const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: "eletron",
        width: isDev? 1200:600,
        height: 600,
    })
    const startUrl = url.format({
        pathname: path.join(__dirname, '/renderer/index.html'),
        protocol: 'file',
    });
    // Show devtools automatically if in development
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadURL(startUrl);

}

app.whenReady().then(() => {
    createMainWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    })
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (!isMac) app.quit();
});
