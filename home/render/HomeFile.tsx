import * as React from "react";
import { FileItem } from "./Model";

interface Props {
    file: FileItem;
    onFileClick: (FileItem) => void;
    selectedFile: FileItem;
}

export class HomeFile extends React.Component<Props, {}> {

    onClick = (item: FileItem) => (e: any) => {
        this.props.onFileClick(item);
    }

    render() {
        let props = this.props;
        let style = this.props.selectedFile.fullName == this.props.file.fullName ? "item h-file-item h-selected-file" : "item h-file-item"
        return (
            <div className={style} key={props.file.fullName} onClick={this.onClick(props.file)}>
                <i className="twitch icon"></i>
                <div className="content">
                    <div className="header">{props.file.name}</div>
                </div>
            </div>
        );
    }
}