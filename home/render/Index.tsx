import * as ReactDOM from "react-dom";
import * as React from "react";

import { getStructures } from "./Api";
import { HomeTree } from "./HomeTree";
import { setEditor } from "./Global";
import { Structure, NewFileItem, NewFolderItem} from "./Model";
import { getCurrentDir, startBackend } from "./Utility";

import { HomeEditor } from "./HomeEditor";

import "semantic-ui-css/semantic.css";
import "../css/style.css";

export interface Model {
    structure: Structure;
    newFile: NewFileItem;
    newFolder: NewFolderItem;
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
            },
            newFile: {
                open: false,
                name: "",
                location: ""
            }
        })
    }

    openNewFile = (newFile: NewFileItem) => {
        console.log(newFile);
        this.setState({
            newFile: newFile
        });
    }

    render() {
        return (
            <HomeTree structure={this.state.structure} onNewFile={this.openNewFile} newFile={this.state.newFile} />
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