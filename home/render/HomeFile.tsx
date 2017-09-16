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
        let cs = this.props.selectedFile.fullName == this.props.file.fullName ? "item h-file-item h-selected-file" : "item h-file-item"
        let style:any = {
            padding: "2 4 2 4",
            borderRadius: "3px"
        };

        return (
            <div className={cs} style={style} key={props.file.fullName} onClick={this.onClick(props.file)}>
                <i className="code icon"></i>
                <div className="content">
                    <div className="header">{props.file.name}</div>
                </div>
            </div>
        );
    }
}