import * as ReactDOM from "react-dom";
import * as React from "react";
import { HomeMenuBar } from "./HomeMenuBar";
import { getFileContent } from "./Api";
import { createNewFile, getStructures, renameFile, deleteFile } from "./Api";
import { HomeTree } from "./HomeTree";
import { Structure, NewItem, ItemEvent, FileItem, RenameItem } from "./Model";
import { getCurrentDir, startBackend, getMode } from "./Utility";
import { HEditor } from "./HEditor";

import "semantic-ui-css/semantic.css";
import "../css/style.css";

export interface Model {
    structure: Structure;
    newItem: NewItem;
    renameItem: RenameItem;
    currentFile: FileItem;
    currentEdtiorValue: string;
    onEditorValueChange: (string) => void;
    collapses : string[]; 
}

export class App extends React.Component<{}, Model> {

    constructor() {
        super();
        this.reloadStructure();
    }

    emptyFile: FileItem = {
        fullName: "",
        location: "",
        name: "",
        mode: "javascript"
    }

    emptyRename: RenameItem = {
        open: false,
        originalPath: "",
        newName: ""
    }

    reloadStructure() {
        getStructures("/Users/wk/Source/HomeEditor").then(rs => {
            this.setState({
                structure: rs
            })
        });
    }

    openFile = async (file: FileItem) => {

        if (file.fullName == this.state.currentFile.fullName) {
            this.setState({
                renameItem: {
                    originalPath: file.fullName,
                    newName: file.name,
                    open: true
                }
            });

        } else {
            let content = await getFileContent({path: file.fullName});
            let value = content.value;
            document.title = file.fullName;

            this.setState({
                currentFile: file,
                currentEdtiorValue: value
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
                location: this.state.newItem.location,
                mode: getMode(this.state.newItem.name)
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
            renameItem: this.emptyRename
        });
    };

    delete = async (file: FileItem) => {
        await deleteFile({ path: file.fullName });
        this.setState({
            currentFile: this.emptyFile
        })
        await this.reloadStructure();
    };

    change = (value: string) => {
        this.setState({
            currentEdtiorValue: value
        });
    }

    openFolder = (str: Structure) => {

        console.log(str.fullName);

        let cs = this.state.collapses;
        if (cs.indexOf(str.fullName) != -1) {
            this.setState({
                collapses: cs.filter(x => x != str.fullName)
            });
        } else {
            this.setState({
                collapses: cs.concat(str.fullName)
            });
        }
    }

    isCollapse = (path: string) => {
        return this.state.collapses.indexOf(path) != -1;
    };

    itemEvent: ItemEvent = {
        onNewItem: this.newFile,
        onNewItemCancel: this.newFileCancel,
        onNewItemConfirm: this.newFileConfirm,
        onRenameItem: this.renameItem,
        onRenameItemCancel: this.renameItemCancel,
        onRenameItemConfirm: this.renameItemConfirm,
        onDelete: this.delete,
        onOpenFile: this.openFile,
        onOpenFolder: this.openFolder,
        isCollapse: this.isCollapse
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
            renameItem: this.emptyRename,
            currentFile: this.emptyFile,
            currentEdtiorValue: "",
            onEditorValueChange: this.change,
            collapses: []
        })
    }

    render() {
        let style: any = {
            position: "relative"
        };

        return (
            <div className="ui internally celled grid">
                <div className="row">
                    <div className="twelve wide column" style={{padding:0}}>
                        <HEditor 
                            mode={this.state.currentFile.mode}
                            value={this.state.currentEdtiorValue} 
                            onChange={this.state.onEditorValueChange}/>
                    </div>
                    <div className="four wide column" style={{padding:"0 10 0 10"}}>
                        <div className="h-home-explorer" style={style}>
                            <HomeMenuBar currentFile={this.state.currentFile} itemEvent={this.itemEvent} />
                            <HomeTree
                                structure={this.state.structure}
                                collapses={this.state.collapses}
                                itemEvent={this.itemEvent}
                                renameItem={this.state.renameItem}
                                newItem={this.state.newItem}
                                selectedFile={this.state.currentFile} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

startBackend();
ReactDOM.render(<App />, document.getElementById("app"));
