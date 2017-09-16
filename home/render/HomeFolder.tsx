import * as React from "react";

import { FileItem, Structure, NewItem, ItemEvent, RenameItem } from "./Model";
import { HomeFile } from "./HomeFile";
import { HomeNewFile } from "./HomeNewFile";
import { HomeNewFolder } from "./HomeNewFolder";

interface Props { 
    selectedFile: FileItem;
    structure: Structure;
    itemEvent: ItemEvent;
    newItem: NewItem;
    renameItem: RenameItem;
}

export class HomeFolder extends React.Component<Props, {}> {

    newFileClick = (e: any) => {
        this.props.itemEvent.onNewItem({
            open: true,
            fileName: "NewFile",
            location: this.props.structure.fullName
        });
    };

    newItemChange = (value: string) => {
        this.props.itemEvent.onNewItem({
            location: this.props.structure.fullName,
            name: value, 
            open: true, 
        });
    }

    renameItemChange = (value: string) => {
        this.props.itemEvent.onRenameItem({
            originalPath: this.props.selectedFile.fullName,
            open: true,
            newName: value
        });
    }

    renameFile = (file: FileItem) => (e: any) => {
    };

    showNewFile = () => {
        let event = this.props.itemEvent;

        if (this.props.newItem.open && this.props.newItem.location == this.props.structure.fullName) {
           return <HomeNewFile 
                     value={this.props.newItem.name} 
                     onCancel={event.onNewItemCancel} 
                     onChange={this.newItemChange}
                     onConfirm={event.onNewItemConfirm} />
        } else 
           return "";
    };

    showFile = (x: FileItem) => {
        let event = this.props.itemEvent;

        if (this.props.renameItem.open && this.props.renameItem.originalPath == x.fullName) {
           return <HomeNewFile 
                     key={x.fullName}
                     value={this.props.renameItem.newName} 
                     onCancel={event.onRenameItemCancel} 
                     onChange={this.renameItemChange}
                     onConfirm={event.onRenameItemConfirm} />
        }
        else {
            return <HomeFile
                    key={x.fullName} 
                    file={x} 
                    onFileClick={this.props.itemEvent.onOpenFile} 
                    selectedFile={this.props.selectedFile} />
        }
    };

    render() {
        let str = this.props.structure;
        let style:any = {
            padding: "2 4 2 4",
            borderRadius: "3px"
        };

        return (
            <div className="item h-folder" style={style} key={str.fullName}>
                <i className="windows icon"></i>
                <div className="content">
                    <div className="header">{str.name}
                        <span style={{ paddingLeft: "5px" }}>
                            <i className="ui angle down icon h-pointer" onClick={this.newFileClick}></i>
                        </span>
                    </div>
                    <div className="list">
                        {this.showNewFile()}

                        {str.folders.map(x => 
                            <HomeFolder 
                                key={x.fullName}
                                selectedFile={this.props.selectedFile}
                                structure={x} 
                                renameItem={this.props.renameItem}
                                newItem={this.props.newItem}
                                itemEvent={this.props.itemEvent} />)}

                        {str.files.map(this.showFile)}

                    </div>
                </div>
            </div>
        );
    }
}