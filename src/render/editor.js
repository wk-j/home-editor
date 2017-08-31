import * as ReactDOM from "react-dom";
import * as React from "react";
import { TreeExample } from "./tree";
import { HomeEditor } from "./home";

import "photonkit/dist/css/photon.css"

export class HomeTree extends React.Component {
    render() {
        return (
            <TreeExample/>
        );
    }
}

//ReactDOM.render(<HomeTree />, document.getElementById("home-tree"));
let file = "/Users/wk/Source/home-editor/README.md";
let home = new HomeEditor("home-editor");
let editor = home.getEditor();
home.editFile(editor, file);