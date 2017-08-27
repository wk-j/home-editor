import * as ReactDOM from "react-dom";
import * as React from "react";
import { TreeExample } from "./tree";
import { HomeEditor } from "./home";

//import AceEditor from "react-ace";
//import brace from "brace";

//import "brace/mode/javascript";
//import "brace/theme/github";

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