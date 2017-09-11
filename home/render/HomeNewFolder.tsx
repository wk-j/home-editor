import * as React from "react";
import { HomeFile } from "./HomeFile";
import { FileItem, NewFolderItem } from "./Model";


interface Props {
    file: NewFolderItem
}

export class HomeNewFolder extends React.Component<Props, {}> {
    render() {
        let fileStyle = {}
        let item = this.props.file;
        return (
            <div className="item h-file" key={item.fullName}>
                <i className="twitch icon"></i>
                <div className="content">
                    <input type="text" value={item.name} />
                </div>
            </div>
        );
    }
}