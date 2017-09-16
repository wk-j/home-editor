import * as React from "react";
import { HomeFile } from "./HomeFile";
import { FileItem } from "./Model";

interface Props {
    file: any;
}

export class HomeNewFolder extends React.Component<Props, {}> {
    render() {
        let fileStyle = {}
        let item = this.props.file;
        return (
            <div className="item h-file" key={item.location}>
                <i className="twitch icon"></i>
                <div className="content">
                    <input type="text" value={item.name} />
                </div>
            </div>
        );
    }
}