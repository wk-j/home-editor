import * as React from "react";

interface Props {

}

export class HomeMenuBar extends React.Component<Props, {}> {
    render() {
        let style: any = {
            position: "absolute",
            right: "0px",
            top: "0px",
            zIndex: 100
        };
        return (
            <div className="h-menu-bar" style={style}>
                <div className="ui vertical icon menu">
                    <a className="item">
                        <i className="gamepad icon"></i>
                    </a>
                    <a className="item">
                        <i className="video camera icon"></i>
                    </a>
                    <a className="item">
                        <i className="video play icon"></i>
                    </a>
                </div>
            </div>
        );
    }
}