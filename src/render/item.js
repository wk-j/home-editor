import * as React from "react";

export class Item extends React.Component {

    render() {
        let red = { color: "#fc605b" };
        let orange = { color: "#fdbc40" };
        let green = { color: "#34c84a" };
        let blue = { color: "#57acf5" };

        return (
            <nav className="nav-group">
                <span className="nav-group-item">
                    package-lock.json
                </span>
                <span className="nav-group-item">
                    package.json
                </span>
                <span className="nav-group-item">
                    README.md
                </span>
                <span className="nav-group-item">
                    tsconfig.json
                </span>
                <span className="nav-group-item">
                    webpack.config.js
                </span>
            </nav>
        );
    }
}