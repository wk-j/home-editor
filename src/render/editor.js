import * as ReactDOM from "react-dom";
import * as React from "react";
import { Item, HomeTree } from "./components";
import { HomeEditor } from "./home";
import { getCurrentDir } from "./utility";
import { observable } from "mobx-react";
const glob = require("glob");

import "photonkit/dist/css/photon.css";
import "semantic-ui-css/semantic.css";

export class Model {
    @observable
    files = []
}

/*
let files = [
    { fullName: "full1.js", name: "name1.js", content: "", saved: true },
    { fullName: "full2.js", name: "name2.js", content: "", saved: true },
];
*/


let options = {
    cwd: getCurrentDir(),
    ignore: [
        "**/node_modules/**/*.*",
        "**/packages/**/*.*"
    ],
    absolute: true,
    nodir: true
};

function getFiles() {
    glob("**/*.json", options, (err, files) => {
        if (!err) {
            console.log(files);
        }
    });
}

ReactDOM.render(<HomeTree files={files}/>, document.getElementById("home-tree"));

let file = "/Users/wk/Source/home-editor/README.md";
let home = new HomeEditor("home-editor");
let editor = home.getEditor();
home.editFile(editor, file);