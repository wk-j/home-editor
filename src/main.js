
"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
var electron = require("electron");
var path = require("path");
var url = require("url");
var win;
function createWindow() {
    win = new electron.BrowserWindow({ 
        width: 800, 
        height: 600,  
        titleBarStyle: "hidden" });
    win.loadURL(url.format({
        pathname: path.join(__dirname, "../dist/index.html"),
        protocol: "file:",
        slashes: true
    }));
    win.on("closed", function () {
        win = null;
    });
}
electron.app.on("ready", createWindow);
electron.app.on("window-all-closed", function () {
    if (process.platform !== "darwin")
        electron.app.quit();
});
electron.app.on("activate", function () {
    if (win === null) {
        createWindow();
    }
});
