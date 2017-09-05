import * as React from "react";
import * as path from "path";
import { getFiles, getCurrentDir } from "./utility";
import image from "../images/matthew.png";
import { observer } from "mobx-react";

@observer
export class HomeTree extends React.Component {

  getStructure() {
    return this.props.model.structure;
  }

  getPath() {
    return this.props.model.path;
  }

  fileItem(item) {
    let fileStyle = { }
    return (
      <div className="item h-file" key={item.fullName} onClick={this.fileClick(item)}>
        {/* <i className="file text outline icon"></i> */}
        <i className="angle double right icon"></i>
        <div className="content">
          <div className="header">{item.name}</div>
        </div>
      </div>
    );
  }

  fileClick = (file) => (e) => {
    console.log(file.fullName);
  };

  folderItem(str) {
    return (
      <div className="item h-folder" key={str.fullName}>
        <i className="lab icon"></i>
        <div className="content">
          <div className="header">{str.name}</div>
          {/* <div className="description">{str.files.length} files {str.folders.length} folders</div> */}
          <div className="list">
            {str.files.map(x => this.fileItem(x))}
            {str.folders.map(x => this.folderItem(x))}
          </div>
        </div>
      </div>
    );
  }

  handleChange(event) {
    var value = event.target.value;
    this.props.model.setPath(value);
  }

  render() {
    let str = this.getStructure();
    let path = this.getPath();
    let mainStyle = {
      overflowX: "scroll",
      overflowY: "scroll"
    }

    return (
      <div className="ui list">
        <div className="item">
          <i className="cube icon"></i>
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