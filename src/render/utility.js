const sh = require("shelljs");
const glob = require("glob");
const path = require("path");

export function getArgs() {
    var args = process.argv.splice(process.execArgv.length + 2);
    return args;
}

export function getCurrentDir() {
    var cwd = sh.pwd();
    return cwd + "";
}

export function getFiles(options, callback) {
    glob("**/*.json", options, (err, files) => {
        if (!err) {
            var items = files.map(file => 
                {
                    return {
                        fullName: file,
                        name: path.basename(file),
                        content: "",
                        saved: true
                    }
                });
            callback(items);
        }
        else {
            callback([]);
            console.error(err);
        }
    });
}