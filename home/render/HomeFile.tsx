import * as React from "react";
import { FileItem } from "./Model";

interface Props {
    file: FileItem;
    onFileClick: (FileItem) => void;
}

export class HomeFile extends React.Component<Props, {}> {

    onClick = (item: FileItem) => (e: any) => {
        this.props.onFileClick(item);
    }

    render() {
        let props = this.props;
        return(
            <div className="item h-file" key={props.file.fullName} onClick={this.onClick(props.file)}>
            <i className="twitch icon"></i>
            <div className="content">
              <div className="header">{props.file.name}</div>
            </div>
          </div>
        );
    }
}