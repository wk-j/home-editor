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

export function getArgs() {
    var args = process.argv.splice(process.execArgv.length + 2);
    return args;
}

export function getCurrentDir() {
    var cwd = sh.pwd();
    return cwd + "";
}