import * as React from "react";
import * as path from "path";

import { getCurrentDir } from "./Utility";
import { Structure, FileItem, NewItem, ItemEvent, RenameItem } from "./Model";
import { HomeFolder } from "./HomeFolder";
import { HomeFile } from "./HomeFile";

interface Props {
  structure: Structure;
  itemEvent: ItemEvent
  newItem: NewItem;
  renameItem: RenameItem;
  selectedFile: FileItem;
  collapses: string []
}

export class HomeTree extends React.Component<Props, {}> {

  render() {
    let str = this.props.structure;

    let style: any = {
      position: "relative",
      overflow: "scroll",
      margin: "10 0 10 0",
      height: "calc(100% - 38px)"
    }

    let collapse = this.props.collapses.indexOf(str.fullName) != -1;

    return (
      <div className="ui list noselect h-home-tree" style={style}>
        <div className="item">
            <div className="list">
              <HomeFolder
                key={str.fullName}
                structure={str}
                selectedFile={this.props.selectedFile}
                newItem={this.props.newItem}
                renameItem={this.props.renameItem}
                itemEvent={this.props.itemEvent} />
            </div>
          </div>
      </div>
    );
  }
}