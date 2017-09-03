import * as React from "react";
import * as path from "path";
import image from "../images/matthew.png";

export class HomeTree extends React.Component {
  render() {
      return (
          <Item files={this.props.files}/>
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

  render() {
    let list = { padding: "5px" };

    console.log(this.props.files);

    return (
      <div className="ui middle aligned selection list">
        {
          this.props.files.map(file => <HomeFile file={file} key={file.fullName} />)
        }
      </div>
    );
  }
}