import * as ReactDOM from "react-dom";
import * as React from "react";
import { Item } from "./item";
import { HomeEditor } from "./home";

import "photonkit/dist/css/photon.css"

export class HomeTree extends React.Component {
    render() {
        return (
            <Item/>
        );
    }
}

ReactDOM.render(<HomeTree/>, document.getElementById("home-tree"));

let file = "/Users/wk/Source/home-editor/README.md";
let home = new HomeEditor("home-editor");
let editor = home.getEditor();
home.editFile(editor, file);