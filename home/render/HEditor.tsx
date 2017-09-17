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

import "brace/keybinding/vim"

interface Props {
    onChange: (string) => void;
    value: string
    mode: string
}

export class HEditor extends React.Component<Props, {}> {

    render() {
        return (
            <AceEditor
                fontSize={14}
                width="100%"
                height="100%"
                keyboardHandler="vim"
                value={this.props.value}
                mode={this.props.mode}
                theme="twilight"
                onChange={this.props.onChange}
                name="home-editor"
                setOptions={{
                   fontFamily: "Iosevka",
                   cursorStyle: "smooth"
                }}
                editorProps={
                    {
                         $blockScrolling: true
                    }}
            />
        );
    }
}