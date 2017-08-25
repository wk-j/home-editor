import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url  from "url";
import * as fs from "fs";

var win : any;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600});
    console.log(__dirname);
    win.loadURL(url.format({
        pathname: path.join(__dirname, "../public/react-index.html"),
        protocol: "file:",
        slashes: true
    }));

    win.on("closed", () => {
        win = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
    if(win === null) {
        createWindow();
    }
});