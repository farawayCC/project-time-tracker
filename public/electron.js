const electron = require("electron");
const {
  app,
  BrowserWindow,
  ipcMain,
  Notification
} = electron;

const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 820,
    height: 680,
    minWidth: 1000,
    minHeight: 480,
    icon: '../public/icon.ico',
    webPreferences: {
      backgroundThrottling: false,
      contextIsolation: false,
      preload: path.join(__dirname, 'electron-preload.js')
    }
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.setAppUserModelId("Project Time Tracker")

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('notify', (_, arg) => {
  sendNotification(arg.title, arg.body)
})

function sendNotification(title, body) {
  new Notification({
    title, body
  }).show();
}