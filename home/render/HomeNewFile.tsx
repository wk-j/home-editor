import * as React from "react";
import { HomeFile } from "./HomeFile";
import { FileItem, NewItem, ItemEvent } from "./Model";

interface Props {
    value: string;
    onConfirm: () => void;
    onChange: (string) => void;
    onCancel: () => void;
}

export class HomeNewFile extends React.Component<Props, {}> {

    keyUp = (evt: any) => {
        var evt = evt || window.event;
        if (evt.keyCode == 27) {
            this.props.onCancel();
        }
    };

    keyPress = (e: any) => {
        if(e.charCode == 13) {
            this.props.onConfirm();
        }
    }

    change = (e: React.ChangeEvent<HTMLInputElement>) => {
        var value = e.target.value;
        this.props.onChange(value);
    }

    blur = (e: any) => {
        this.props.onCancel();
    }

    focus = (e: any) => {
        e.target.select();
    }

    render() {
        let style = {
            padding: "0 3 0 3"
        };

        return (
            <div className="item h-file-item" style={style}>
                <i className="code icon"></i>
                <div className="content">
                    <input type="text" 
                        value={this.props.value} 
                        onBlur={this.blur}
                        onKeyPress={this.keyPress}  
                        onKeyUp={this.keyUp}
                        onFocus={this.focus}
                        onChange={this.change} autoFocus/>
                </div>
            </div>
        );
    }
}