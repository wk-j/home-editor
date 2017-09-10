import * as React from "react";

import { FileItem, Structure } from "./Model";
import { HomeFile } from "./HomeFile";
import { HomeNewFile } from "./HomeNewFile";

interface Props { 
    structure: Structure
    onFileClick: (FileItem) => void;
}

export class HomeFolder extends React.Component<Props, {}> {

    render() {
        var str = this.props.structure;

        return (
            <div className="item h-folder" key={str.fullName}>
                <i className="windows icon"></i>
                <div className="content">
                    <div className="header">{str.name}
                        <span style={{ paddingLeft: "5px" }}>
                            {/* <i className="ui slack icon"></i> */}
                            <i className="ui twitch icon"></i>
                        </span>
                    </div>
                    <div className="list">
                        <HomeNewFile file={{fullName: "", name: "fileName"}} />
                        {str.files.map(x => <HomeFile file={x} onFileClick={this.props.onFileClick} />)}
                        {str.folders.map(x => <HomeFolder structure={x} onFileClick={this.props.onFileClick} />)}
                    </div>
                </div>
            </div>
        );
    }
}