var electron = require("electron");
var path = require("path");
var url = require("url");

import { remote } from "electron";

console.log(remote);

var win;
function createWindow() {
    win = new electron.BrowserWindow({ 
        width: 1000, 
        height: 800,  
        titleBarStyle: "default" 
    });

    win.loadURL(url.format({
        //pathname: path.join(__dirname, "../index.html"),
        pathname: "/Users/wk/Source/HomeEditor/dist/Index.html",
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
