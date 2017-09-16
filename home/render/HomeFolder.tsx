import * as React from "react";

import { FileItem, Structure, NewFileItem, ItemEvent } from "./Model";
import { HomeFile } from "./HomeFile";
import { HomeNewFile } from "./HomeNewFile";
import { HomeNewFolder } from "./HomeNewFolder";

interface Props { 
    selectedFile: FileItem;
    structure: Structure;
    itemEvent: ItemEvent;
    newFile: NewFileItem;
}

export class HomeFolder extends React.Component<Props, {}> {

    newFileClick = (e: any) => {
        this.props.itemEvent.onNewFile({
            open: true,
            fileName: "NewFile",
            location: this.props.structure.fullName
        });
    };

    newFileChange = (value: string) => {
        this.props.itemEvent.onNewFile({
            location: this.props.structure.fullName,
            name: value, 
            open: true
        });
    }

    showNewFile = () => {
        let event = this.props.itemEvent;

        if (this.props.newFile.open && this.props.newFile.location == this.props.structure.fullName) {
           return <HomeNewFile 
                     value={this.props.newFile.name} 
                     onCancel={event.onNewFileCancel} 
                     onChange={this.newFileChange}
                     onConfirm={event.onNewFileConfirm} />
        } else 
           return "";
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
                            {/* <i className="ui slack icon"></i> */}
                            <i className="ui angle down icon h-pointer" onClick={this.newFileClick}></i>
                        </span>
                    </div>
                    <div className="list">
                        {this.showNewFile()}
                        {str.files.map(x => <HomeFile key={x.fullName} file={x} onFileClick={this.props.itemEvent.onFileClick} selectedFile={this.props.selectedFile} />)}
                        {str.folders.map(x => 
                            <HomeFolder 
                                key={x.fullName}
                                selectedFile={this.props.selectedFile}
                                structure={x} 
                                newFile={this.props.newFile}
                                itemEvent={this.props.itemEvent} />)}
                    </div>
                </div>
            </div>
        );
    }
}