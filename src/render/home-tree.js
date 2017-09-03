import * as React from "react";
import * as path from "path";
import { getFiles, getCurrentDir } from "./utility";
import image from "../images/matthew.png";
import {observer} from "mobx-react";

@observer
export class HomeTree extends React.Component {
  constructor() {
    super();

    let options = {
      cwd: getCurrentDir(),
      ignore: [
        "node_modules/**/*.*",
        "packages/**/*.*"
      ],
      absolute: true,
      nodir: true
    };

    getFiles(options, files => {
      console.log(files);
      this.props.model.files = files;
    });
  }

  render() {
    console.log(this.props.model.count);
    return (
      <Item files={this.props.model.files} count={this.props.model.count} />
    );
  }
}

export class HomeFile extends React.Component {
  render() {
    return (
      <div className="item" key={this.props.fullName}>
        <div className="content">
          <div className="header">
            {this.props.file.name}
          </div>
        </div>
      </div>
    );
  }
}

export class Item extends React.Component {

  showCount() {
    console.log(this.props.count);
  }

  render() {
    let list = { padding: "5px" };
    return (
      <div className="ui middle aligned selection list">
        {
          this.props.files.map(file => <HomeFile file={file} key={file.fullName} />)
        }
      </div>
    );
  }
}