import * as React from "react";
import { HomeFile } from "./HomeFile";
import { FileItem, NewFileItem, ItemEvent } from "./Model";

interface Props {
    file: NewFileItem;
    itemEvent: ItemEvent;
}

export class HomeNewFile extends React.Component<Props, {}> {

    keyPress = (e: any) => {
        if(e.charCode == 13){
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
        let fileStyle = {}
        let item = this.props.file;
        return (
            <div className="item h-file-item" key={item.location}>
                <i className="twitch icon"></i>
                <div className="content">
                    <input type="text" value={item.name} onKeyPress={this.keyPress}  onChange={this.change}/>
                </div>
            </div>
        );
    }
}