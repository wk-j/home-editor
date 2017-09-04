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

  file(item) {
    return (
      <div className="item" key={item.fullName}>
        <i className="spotify icon"></i>
        <div className="content">
          <div className="header">{item.name}</div>
        </div>
      </div>
    );
  }

  folder(str) {
    return (
      <div className="item" key={str.fullName}>
        <i className="cube icon"></i>
        <div className="content">
          <div className="header">{str.name}</div>
          <div className="list">
            {str.files.map(x => this.file(x))}
            {str.folders.map(x => this.folder(x))}
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
              {str.files.map(x => this.file(x))}
              {str.folders.map(x => this.folder(x))}
            </div>
          </div>
        </div>
      </div>
    );
  }

}