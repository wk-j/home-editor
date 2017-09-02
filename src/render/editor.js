import * as ReactDOM from "react-dom";
import * as React from "react";
import { Item } from "./item";
import { HomeEditor } from "./home";

import "photonkit/dist/css/photon.css";
import "semantic-ui-css/semantic.css";

export class HomeTree extends React.Component {
    render() {
        let files = [
            { fullName: "full1.js", name: "name1.js" },
            { fullName: "full2.js", name: "name2.js" },
        ];
        return (
            <Item files={files}/>
        );
    }
}

ReactDOM.render(<HomeTree/>, document.getElementById("home-tree"));

let file = "/Users/wk/Source/home-editor/README.md";
let home = new HomeEditor("home-editor");
let editor = home.getEditor();
home.editFile(editor, file);