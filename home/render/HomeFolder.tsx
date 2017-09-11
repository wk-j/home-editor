import * as React from "react";

import { FileItem, Structure, NewFileItem } from "./Model";
import { HomeFile } from "./HomeFile";
import { HomeNewFile } from "./HomeNewFile";
import { HomeNewFolder } from "./HomeNewFolder";

interface Props { 
    structure: Structure
    onFileClick: (FileItem) => void;
    onNewFile: (NewFileItem) => void;
    newFile: NewFileItem;
}

export class HomeFolder extends React.Component<Props, {}> {

    newFile = (item: NewFileItem) => {
        this.props.onNewFile(item);
    };

    newFileClick = (e: any) => {
        this.props.onNewFile({
            open: true,
            fileName: "",
            location: this.props.structure.fullName
        });
        console.log(this.props.newFile);
    };

    showNewFile = () => {
        console.log(this.props.newFile);
        console.log(this.props.structure.fullName);
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
                        {str.files.map(x => <HomeFile file={x} onFileClick={this.props.onFileClick} />)}
                        {str.folders.map(x => 
                            <HomeFolder 
                                structure={x} 
                                onFileClick={this.props.onFileClick} 
                                newFile={this.props.newFile}
                                onNewFile={this.newFile} />)}
                    </div>
                </div>
            </div>
        );
    }
}