import * as ReactDOM from "react-dom";
import * as React from "react";
import { Item, HomeTree } from "./home-tree";
import { HomeEditor } from "./home";
import { getCurrentDir, startBackend } from "./utility";
import { observable, computed, action } from "mobx";
import { getStructures } from "./api";

import "semantic-ui-css/semantic.css";
import "../style.css";

startBackend();

export class Structure {
    name = "";
    fullName = "";
    files = [];
    folders = [];
}

export class Model {
    @observable
    files = []

    @computed
    get count() { 
        return this.files.length;
    }

    @observable
    structure = new Structure();

    @observable
    path = getCurrentDir();

    setPath = action((path) => {
        console.log(path);
        this.path = path;
    });
}

var model = new Model();

getStructures(model.path).then(rs => {
    console.log("reload ...");
    model.structure = rs.data;
});

ReactDOM.render(<HomeTree model={model}/>, document.getElementById("home-tree"));

let file = "/Users/wk/Source/home-editor/README.md";
let home = new HomeEditor("home-editor");
let editor = home.getEditor();
home.editFile(editor, file);