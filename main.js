// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray } = require("electron");
const { platform } = require("os");
const path = require("path");

var AutoLaunch = require("auto-launch");
var autoLauncher = new AutoLaunch({
  name: "Musla",
});

autoLauncher
  .isEnabled()
  .then(function (isEnabled) {
    if (isEnabled) return;
    autoLauncher.enable();
  })
  .catch(function (err) {
    throw err;
  });

let mainWindow, tray;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1027,
    height: 650,
    resizable: false,
    fullscreen: false,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  let isAppQuitting = false;
  app.on("before-quit", function (evt) {
    isAppQuitting = true;
  });

  mainWindow.on("close", function (evt) {
    if (!isAppQuitting) {
      evt.preventDefault();
      mainWindow.hide();
      mainWindow.loadFile("index.html");
    }
  });
 // mainWindow.setMenuBarVisibility(false);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  tray = new Tray("asstes/image/icon.png");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open",
      click: function () {
        mainWindow.show();
      },
    },
    {
      label: "Quit",
      click: function () {
        app.quit();
      },
    },
  ]);
  tray.setToolTip("Musla");
  tray.setContextMenu(contextMenu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

// Set a variable when the app is quitting.

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
