import * as ReactDOM from "react-dom";
import * as React from "react";
import { HomeMenuBar } from "./HomeMenuBar";

import { 
    createNewFile,
    createNewFolder,
    getStructures 
} from "./Api";

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
    currentFile: FileItem;
}

export class App extends React.Component<{}, Model> {
    editor = getEditor();

    constructor() {
        super();
        this.reloadStructure();
    }

    reloadStructure() {
        getStructures("/Users/wk/Source/HomeEditor").then(rs => {
            this.setState({
                structure: rs
            })
        });
    }

    fileClick = (file: FileItem) => {
        this.editor.editFile(file.fullName);
        document.title = file.fullName;

        this.setState({
            currentFile: file
        });
        
        this.newFileCancel();
    };

    newFile = (newFile: NewFileItem) => {
        this.setState({
            newFile: newFile
        });
    }

    newFileConfirm = async () => { 
        await createNewFile({
            location: this.state.newFile.location,
            name: this.state.newFile.name,
            open: false
        });
        await this.reloadStructure();

        this.setState({
            currentFile: {
                name: this.state.newFile.name,
                fullName : this.state.newFile.location + "/" + this.state.newFile.name
            }
        });

        this.newFileCancel();
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
            },
            currentFile: {
                fullName: "",
                name: ""
            }
        })
    }

    render() {
        let style: any = {
            position: "relative"
        };

        return (
            <div className="h-explorer" style={style}>
                <HomeMenuBar />
                <HomeTree 
                    structure={this.state.structure} 
                    itemEvent={this.itemEvent} 
                    newFile={this.state.newFile} 
                    selectedFile={this.state.currentFile} />
            </div>
        );
    }
}

function start() {
    startBackend();
    let home = new HomeEditor("q-home-editor");
    setEditor(home);
    ReactDOM.render(<App />, document.getElementById("q-home-explorer"));
}

start();