import * as ReactDOM from "react-dom";
import * as React from "react";
import { Item } from "./item";
import { HomeEditor } from "./home";
// import * as glob from "glob";
import { getCurrentDir } from "./utility";
const glob = require("glob");

import "photonkit/dist/css/photon.css";
import "semantic-ui-css/semantic.css";

export class HomeTree extends React.Component {
    render() {
        return (
            <Item files={this.props.files}/>
        );
    }
}

let files = [
    { fullName: "full1.js", name: "name1.js", content: "", saved: true },
    { fullName: "full2.js", name: "name2.js", content: "", saved: true },
];

let options = {
    cwd: getCurrentDir(),
    ignore: [
        "node_modules",
        "packages"
    ]
};

glob("**/*.json", options, function (er, files) {
    console.log(files);
})

ReactDOM.render(<HomeTree files={files}/>, document.getElementById("home-tree"));

let file = "/Users/wk/Source/home-editor/README.md";
let home = new HomeEditor("home-editor");
let editor = home.getEditor();
home.editFile(editor, file);