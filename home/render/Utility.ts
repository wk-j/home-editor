const sh = require("shelljs");
const glob = require("glob");
const path = require("path");

export function startBackend() {
    var exec = require('child_process').exec;
    let exe =  __dirname + "/backend/StructureMonitor";
    exec(exe, function callback(error, stdout, stderr){
        if(error) {
            console.log(error);
        }else {
            
        }
    });
}

export function getMode(name: string) { 
    let modes = [
        { ext: ".js", mode: "javascript "},
        { ext: ".md", mode: "markdown"},
        { ext: ".css", mode: "css"},
        { ext: ".html", mode: "html"},
    ];

    let rs = modes.filter(x => name.indexOf(x.ext) > 0);
    if (rs.length > 0) return rs[0].mode
    else {
        "javascript"
    };
}

export function getArgs() {
    var args = process.argv.splice(process.execArgv.length + 2);
    return args;
}

export function getCurrentDir() {
    var cwd = sh.pwd();
    return cwd + "";
}