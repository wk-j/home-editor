import * as React from "react";

import { FileItem, Structure, NewFileItem, ItemEvent } from "./Model";
import { HomeFile } from "./HomeFile";
import { HomeNewFile } from "./HomeNewFile";
import { HomeNewFolder } from "./HomeNewFolder";

interface Props { 
    structure: Structure
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

    showNewFile = () => {
        if (this.props.newFile.open && this.props.newFile.location == this.props.structure.fullName) {
           return <HomeNewFile file={this.props.newFile} />
        } else 
           return "";
    };

    render() {
        var str = this.props.structure;

        return (
            <div className="item h-folder" key={str.fullName}>
                <i className="windows icon"></i>
                <div className="content">
                    <div className="header">{str.name}
                        <span style={{ paddingLeft: "5px" }}>
                            {/* <i className="ui slack icon"></i> */}
                            <i className="ui twitch icon" onClick={this.newFileClick}></i>
                        </span>
                    </div>
                    <div className="list">
                        {this.showNewFile()}
                        {str.files.map(x => <HomeFile file={x} onFileClick={this.props.itemEvent.onFileClick} />)}
                        {str.folders.map(x => 
                            <HomeFolder 
                                structure={x} 
                                newFile={this.props.newFile}
                                itemEvent={this.props.itemEvent} />)}
                    </div>
                </div>
            </div>
        );
    }
}