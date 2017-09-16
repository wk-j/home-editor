import * as React from "react";

import { FileItem, ItemEvent } from "./Model";
import { remote } from "electron"

interface Props {
    currentFile: FileItem
    itemEvent: ItemEvent
}

export class HomeMenuBar extends React.Component<Props, {}> {

    style: any = {
        position: "absolute",
        right: "0px",
        top: "0px",
        zIndex: 100
    };

    listStyle: any = {
        backgroundColor: "rgba(255, 255, 255, 0.8)"
    }

    itemStyle: any = {
        padding: "5px"
    }

    delete = (e: any) => {
        let rs = remote.dialog.showMessageBox({
            type: "question",
            buttons: ["Yes", "No"],
            title: "Config",
            message: `Delete ${this.props.currentFile.name}`
        });

        if (rs == 0) {
            this.props.itemEvent.onDelete(this.props.currentFile);
        }
    };

    render() {
        let cls = this.props.currentFile.fullName ? "item" : "item disabled";
        return (
            <div className="h-menu-bar" style={this.style}>
                <div className="ui vertical icon menu" style={this.listStyle}>
                    <a className="item" style={this.itemStyle}>
                        <i className="gamepad icon"></i>
                    </a>
                    <a className={cls} style={this.itemStyle} onClick={this.delete}>
                        <i className="delete icon"></i>
                    </a>
                </div>
            </div>
        );
    }
}