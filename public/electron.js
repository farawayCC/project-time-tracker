const electron = require("electron");
const {
  app,
  BrowserWindow
} = electron;

const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;

function createWindow() {
  //icon taken from https://www.flaticon.com/premium-icon/time-management_4482235?term=project%20time&page=1&position=9&page=1&position=9&related_id=4482235&origin=tag
  mainWindow = new BrowserWindow({
    width: 820,
    height: 680,
    minWidth: 800,
    minHeight: 430,
    icon: '../public/icon.ico',
    webPreferences: {
      backgroundThrottling: false,
      contextIsolation: false,
      preload: path.join(__dirname, 'electron-preload.js')
    }
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:4000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.setAppUserModelId("Your app name")

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
