import * as React from "react";
import { HomeFile } from "./HomeFile";
import { FileItem, NewFileItem, ItemEvent } from "./Model";

interface Props {
    file: NewFileItem;
    itemEvent: ItemEvent;
}

export class HomeNewFile extends React.Component<Props, {}> {

    keyUp = (evt: any) => {
        var evt = evt || window.event;
        if (evt.keyCode == 27) {
            this.props.itemEvent.onNewFileCancel();
        }
    };

    keyPress = (e: any) => {
        if(e.charCode == 13) {
            this.props.itemEvent.onNewFileConfirm();
        }
    }

    change = (e: React.ChangeEvent<HTMLInputElement>) => {
        var value = e.target.value;
        this.props.itemEvent.onNewFile({
            open: true,
            location: this.props.file.location,
            name: value
        });
    }

    render() {
        let style = {
            padding: "0 3 0 3"
        };

        let item = this.props.file;
        return (
            <div className="item h-file-item" style={style} key={item.location}>
                <i className="code icon"></i>
                <div className="content">
                    <input type="text" 
                        value={item.name} 
                        onKeyPress={this.keyPress}  
                        onKeyUp={this.keyUp}
                        onChange={this.change} autoFocus/>
                </div>
            </div>
        );
    }
}