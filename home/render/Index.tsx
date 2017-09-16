import * as ReactDOM from "react-dom";
import * as React from "react";
import { HomeMenuBar } from "./HomeMenuBar";

import {
    createNewFile,
    getStructures,
    renameFile
} from "./Api";

import { HomeTree } from "./HomeTree";
import { setEditor } from "./Global";
import { Structure, NewItem, ItemEvent, FileItem, RenameItem } from "./Model";
import { getCurrentDir, startBackend } from "./Utility";
import { getEditor } from "./Global";
import { HomeEditor } from "./HomeEditor";

import "semantic-ui-css/semantic.css";
import "../css/style.css";

export interface Model {
    structure: Structure;
    newItem: NewItem;
    renameItem: RenameItem;
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

    openFile = (file: FileItem) => {

        if (file.fullName == this.state.currentFile.fullName) {
            this.setState({
                renameItem: {
                    originalPath: file.fullName,
                    newName: file.name,
                    open: true
                }
            });

        } else {

            this.editor.editFile(file.fullName);
            document.title = file.fullName;

            this.setState({
                currentFile: file
            });

            this.newFileCancel();
        }
    };

    newFile = (newFile: NewItem) => {
        this.setState({
            newItem: newFile
        });
    }

    newFileConfirm = async () => {
        await createNewFile({
            location: this.state.newItem.location,
            name: this.state.newItem.name,
            open: false
        });
        await this.reloadStructure();

        this.setState({
            currentFile: {
                name: this.state.newItem.name,
                fullName: this.state.newItem.location + "/" + this.state.newItem.name,
                location: this.state.newItem.location
            }
        });

        this.newFileCancel();
    }

    newFileCancel = () => {
        this.setState({
            newItem: {
                open: false,
                name: "",
                location: ""
            }
        });
    }

    renameItem = (item: RenameItem) => {
        this.setState({
            renameItem: item
        })
    };

    renameItemCancel = () => {
        let item = this.state.renameItem;
        item.open = false;

        this.setState({
            renameItem: item
        });
    };

    renameItemConfirm = async () => {
        await renameFile({
            originalPath: this.state.renameItem.originalPath,
            newPath: this.state.currentFile.location + "/" + this.state.renameItem.newName
        });

        await this.reloadStructure();

        this.setState({
            renameItem: {
                open: false,
                originalPath: "",
                newName: ""
            }
        });
    };

    itemEvent: ItemEvent = {
        onNewItem: this.newFile,
        onNewItemCancel: this.newFileCancel,
        onNewItemConfirm: this.newFileConfirm,
        onOpenFile: this.openFile,

        onRenameItem: this.renameItem,
        onRenameItemCancel: this.renameItemCancel,
        onRenameItemConfirm: this.renameItemConfirm
    }

    async componentWillMount() {
        this.setState({
            structure: {
                name: "Home",
                fullName: "Home",
                location: "",
                files: [],
                folders: [],
            },
            newItem: {
                open: false,
                name: "NewFile",
                location: ""
            },
            renameItem: {
                open: false,
                originalPath: "",
                newName: ""
            },
            currentFile: {
                fullName: "",
                name: "",
                location: ""
            }
        })
    }

    render() {
        let style: any = {
            position: "relative"
        };

        return (
            <div className="h-home-explorer" style={style}>
                <HomeMenuBar />
                <HomeTree
                    structure={this.state.structure}
                    itemEvent={this.itemEvent}
                    renameItem={this.state.renameItem}
                    newItem={this.state.newItem}
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
