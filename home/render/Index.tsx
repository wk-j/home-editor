import * as ReactDOM from "react-dom";
import * as React from "react";

import { getStructures } from "./Api";
import { HomeTree } from "./HomeTree";
import { setEditor } from "./Global";
import { Structure } from "./Model";
import { getCurrentDir, startBackend } from "./Utility";

import { HomeEditor } from "./HomeEditor";

import "semantic-ui-css/semantic.css";
import "../css/style.css";

export interface Model {
    structure: Structure
}

export class App extends React.Component<{}, Model> {

    constructor() {
        super();

        getStructures("/Users/wk/Source/HomeEditor").then(rs => {
            this.setState({
                structure: rs
            })
        });
    }

    async componentWillMount() {
        this.setState({
            structure: {
                name: "Home",
                fullName: "Home",
                files: [],
                folders: [],
                newFile: false,
                newFileName: "NewFile",
                newFolder: false,
                newFolderName: "NewFolder"
            }
        })
    }

    render() {
        return (
            <HomeTree structure={this.state.structure} />
        );
    }
}

function start() {
    startBackend();
    let home = new HomeEditor("home-editor");
    setEditor(home);
    ReactDOM.render(<App />, document.getElementById("home-tree"));
}

start();