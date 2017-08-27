const sh = require("shelljs");

export class Utility {
    getArgs() {
        var args = process.argv.splice(process.execArgv.length + 2);
        console.log(args);
        console.log(process.argv);
    }

    getCurrentDir() {
        var cwd = sh.pwd();
        console.log(cwd + "");
    }
}