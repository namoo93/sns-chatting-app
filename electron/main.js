const Sentry = require('@sentry/electron');
const { app, BrowserWindow, ipcMain, session } = require('electron');
const os = require('os');
const { machineIdSync } = require('node-machine-id');

Sentry.init({ dsn: 'https://203033abf3434b7799fad90ba296db21@o487415.ingest.sentry.io/6610003' });

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 390,
    height: 760,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.webContents.session.cookies.set({
    url: 'http://localhost:3000',
    name: 'machineId',
    value: machineIdSync(),
  });

  ipcMain.on('get-cache', async (event, res) => {
    event.sender.send('get-cache-end', {
      size: await mainWindow.webContents.session.getCacheSize(),
    });
  });

  ipcMain.on('clear-cache', async (event, res) => {
    await mainWindow.webContents.session.clearCache(), event.sender.send('clear-cache-end', 'ended');
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
