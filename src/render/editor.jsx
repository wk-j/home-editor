import * as ReactDOM from "react-dom";
import * as React from "react";
import { TreeExample } from "./tree";

import AceEditor from "react-ace";
import brace from "brace";

import "brace/mode/javascript";
import "brace/theme/github";
import "photonkit/dist/css/photon.css"

export class Editor extends React.Component {
    render() {
        let style = {
            width: "100%",
            height: "100%"
        };
        return (
            <div style={style}>
                <AceEditor ref="aceEditor" mode="javascript" theme="github"/>
            </div>
        );
    }
}

export class App extends React.Component {
    render() {
        return (
            <div className="window">
                
            <header className="toolbar toolbar-header">
                <div className="toolbar-actions">
                    <button className="btn btn-default pull-right">
                        <span className="icon icon-home"></span>
                    </button>
                    <button className="btn btn-default pull-right">
                        <span className="icon icon-folder"></span>
                    </button>
                </div>
            </header>

                <div className="window-content">
                    <div className="pane-group"> 
                        <div className="pane">
                            <Editor />
                        </div>
                        <div className="pane-sm sidebar">
                                <TreeExample/>
                        </div>
                    </div>
                </div>
                <footer className="toolbar toolbar-footer">
                    <h1 className="title"></h1>
                </footer>
            </div>
        );
    }
}

const content = document.getElementById("content");
ReactDOM.render(<App/>, content);