import * as React from "react";
import image from "../images/matthew.png";

export class Item extends React.Component {

    render() {
        let list = { padding: "5px" };

        return (

        <div className="ui middle aligned selection list">
            <div className="item">
              <img className="ui avatar image" src={image}/>
              <div className="content">
                <div className="header">
                    package-lock.json
                </div>
              </div>
            </div>
            <div className="item">
              <img className="ui avatar image" src={image}/>
              <div className="content">
                <div className="header">
                    webpack.config.js
                </div>
              </div>
            </div>
            <div className="item">
              <img className="ui avatar image" src={image}/>
              <div className="content">
                <div className="header">
                    package.json
                </div>
              </div>
            </div>
          </div>
        );
    }
}