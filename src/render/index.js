import * as ReactDOM from "react-dom";
import * as React from "react";
import { Item, HomeTree } from "./home-tree";
import { HomeEditor } from "./home";
import { getCurrentDir, startBackend } from "./utility";
import { observable, computed, action } from "mobx";
import { getStructures } from "./api";
import { setEditor } from "./global";

import "semantic-ui-css/semantic.css";
import "../style.css";

export class Structure {
    name = "";
    fullName = "";
    files = [];
    folders = [];
}

export class Model {
    @observable
    files = []

    @observable
    structure = new Structure();

    @observable
    path = getCurrentDir();

    setPath = action((path) => {
        this.path = path;
    });
}

export class App extends React.Component {
    constructor() {
        super();

        let model = new Model();

        getStructures(model.path).then(rs => {
            console.log("reload ...");
            model.structure = rs.data;
        });
        
        this.model = model;
    }

    render() {
        return(
            <HomeTree model={this.model}/>
        );
    }
}

function start() {
    startBackend();
    let home = new HomeEditor("home-editor");
    setEditor(home);
    ReactDOM.render(<App/>, document.getElementById("home-tree"));
}

start();