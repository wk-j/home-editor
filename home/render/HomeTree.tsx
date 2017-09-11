import * as React from "react";
import * as path from "path";

import { getCurrentDir } from "./Utility";
import { getEditor } from "./Global";
import { Structure, FileItem, NewFileItem } from "./Model";

import { HomeFolder } from "./HomeFolder";
import { HomeFile } from "./HomeFile";

interface Props {
  structure: Structure; 
  onNewFile: (NewFileItem) => void;
  newFile: NewFileItem;
}

export class HomeTree extends React.Component<Props, {}> {

  editor = getEditor();

  fileClick = (file: FileItem) => {
    console.log(file.fullName);
    this.editor.editFile(file.fullName);
    document.title = file.fullName;
  };

  newFile = (item: NewFileItem) => {
    this.props.onNewFile(item);
  };

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
              {str.files.map(x => <HomeFile file={x} onFileClick={this.fileClick} />  )}
              {str.folders.map(x => <HomeFolder 
                                  structure={x} 
                                  newFile={this.props.newFile}
                                  onFileClick={this.fileClick} 
                                  onNewFile={this.newFile}/>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}