import "photonkit/dist/css/photon.css";
import "semantic-ui-css/semantic.css";

import * as ReactDOM from "react-dom";
import * as React from "react";
import { Item, HomeTree } from "./home-tree";
import { HomeEditor } from "./home";
import { getCurrentDir } from "./utility";
import { observable, computed } from "mobx";

export class Model {
    @observable
    files = []

    @computed
    get count() { 
        return this.files.length;
    }
}

var model = new Model();

ReactDOM.render(<HomeTree model={model}/>, document.getElementById("home-tree"));

let file = "/Users/wk/Source/home-editor/README.md";
let home = new HomeEditor("home-editor");
let editor = home.getEditor();
home.editFile(editor, file);