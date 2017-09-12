import * as ReactDOM from "react-dom";
import * as React from "react";

import { getStructures } from "./Api";
import { HomeTree } from "./HomeTree";
import { setEditor } from "./Global";
import { Structure, NewFileItem, NewFolderItem, ItemEvent, FileItem } from "./Model";
import { getCurrentDir, startBackend } from "./Utility";
import { getEditor } from "./Global";
import { HomeEditor } from "./HomeEditor";

import "semantic-ui-css/semantic.css";
import "../css/style.css";

export interface Model {
    structure: Structure;
    newFile: NewFileItem;
    newFolder: NewFolderItem;
}

export class App extends React.Component<{}, Model> {
    editor = getEditor();

    constructor() {
        super();

        getStructures("/Users/wk/Source/HomeEditor").then(rs => {
            this.setState({
                structure: rs
            })
        });
    }

    fileClick = (file: FileItem) => {
        this.editor.editFile(file.fullName);
        document.title = file.fullName;
    };


    newFile = (newFile: NewFileItem) => {
        console.log(newFile);
        this.setState({
            newFile: newFile
        });
    }

    newFileConfirm = () => { 
    }

    newFileCancel = () => {
        this.setState({
            newFile: {
                open: false,
                name: "",
                location: ""
            }
        });
    }
    
    itemEvent: ItemEvent = {
        onNewFile: this.newFile,
        onNewFileCancel: this.newFileCancel,
        onNewFileConfirm: this.newFileConfirm,
        onFileClick: this.fileClick
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
                name: "NewFile",
                location: ""
            }
        })
    }

    render() {
        return (
            <HomeTree structure={this.state.structure} itemEvent={this.itemEvent} newFile={this.state.newFile} />
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