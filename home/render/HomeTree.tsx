import * as React from "react";
import * as path from "path";

import { getCurrentDir } from "./Utility";
import { getEditor } from "./Global";
import { Structure, FileItem, NewFileItem, ItemEvent } from "./Model";

import { HomeFolder } from "./HomeFolder";
import { HomeFile } from "./HomeFile";

interface Props {
  structure: Structure; 
  itemEvent: ItemEvent
  newFile: NewFileItem;
}

export class HomeTree extends React.Component<Props, {}> {

  fileClick = (file: FileItem) => { 
    this.props.itemEvent
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
              {str.files.map(x => <HomeFile file={x} onFileClick={this.fileClick} />  )}
              {str.folders.map(x => <HomeFolder 
                                  structure={x} 
                                  newFile={this.props.newFile}
                                  itemEvent={this.props.itemEvent} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}