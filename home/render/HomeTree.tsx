import * as React from "react";
import * as path from "path";

import { getCurrentDir } from "./Utility";
import { getEditor } from "./Global";
import { Structure } from "./Model";

export interface Props {
  structure: Structure; 
}

export class HomeTree extends React.Component<Props, {}> {

  editor = getEditor();

  fileClick = (file) => (e) => {
    console.log(file.fullName);
    this.editor.editFile(file.fullName);
    document.title = file.fullName;
  };

  newFileItem(item) {
    let fileStyle = {}
    return (
      <div className="item h-file" key={item.fullName}>
        <i className="twitch icon"></i>
        <div className="content">
          <input type="text" value={item.name} />
        </div>
      </div>
    );
  }

  fileItem(item) {
    let fileStyle = {}
    return (
      <div className="item h-file" key={item.fullName} onClick={this.fileClick(item)}>
        {/* <i className="file text outline icon"></i> */}
        {/* <i className="angle double right icon"></i> */}
        <i className="twitch icon"></i>
        <div className="content">
          <div className="header">{item.name}</div>
        </div>
      </div>
    );
  }

  folderItem(str) {
    return (
      <div className="item h-folder" key={str.fullName}>
        <i className="windows icon"></i>
        <div className="content">
          <div className="header">{str.name}
            <span style={{paddingLeft:"5px"}}>
              {/* <i className="ui slack icon"></i> */}
              <i className="ui twitch icon"></i>
            </span>
          </div>
          <div className="list">
            {this.newFileItem({fullName: "", name: "fileName"})}
            {str.files.map(x => this.fileItem(x))}
            {str.folders.map(x => this.folderItem(x))}
          </div>
        </div>
      </div>
    );
  }

  render() {
    let str = this.props.structure;

    let mainStyle = {
      overflowX: "scroll",
      overflowY: "scroll"
    }

    return (
      <div className="ui list noselect">
        <div className="item">
          <i className="ravelry icon"></i>
          <div className="content">
            <div className="header">{str.name}</div>
            <div className="list">
              {str.files.map(x => this.fileItem(x))}
              {str.folders.map(x => this.folderItem(x))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}