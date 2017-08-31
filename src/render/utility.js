const sh = require("shelljs");

export function getArgs() {
    var args = process.argv.splice(process.execArgv.length + 2);
    return args;
}

export function getCurrentDir() {
    var cwd = sh.pwd();
    return cwd + "";
}