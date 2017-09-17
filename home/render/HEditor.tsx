import * as React from "react";
import { render } from "react-dom";
import * as brace from "brace";
import AceEditor from "react-ace";

import "brace/mode/java";
import "brace/mode/markdown";
import "brace/mode/css";
import "brace/mode/javascript";
import "brace/mode/typescript";

import "brace/theme/github";
import "brace/theme/twilight";
import "brace/theme/tomorrow_night_bright";

interface Props {
    onChange: (string) => void;
    value: string
    mode: string
}

export class HEditor extends React.Component<Props, {}> {

    style: any = {

    }

    render() {
        return (
            <AceEditor
                width="100%"
                height="100%"
                value={this.props.value}
                mode={this.props.mode}
                theme="twilight"
                onChange={this.props.onChange}
                name="home-editor"
                editorProps={
                    {
                         $blockScrolling: true
                    }}
            />
        );
    }
}