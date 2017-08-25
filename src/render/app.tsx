import * as React from "react";
import * as ReactDOM from "react-dom";
import * as MonacoEditor from "react-monaco-editor";

class App extends React.Component {
    render() {
        const requireConfig = {
            url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
            paths: {
              'vs': 'https://www.mycdn.com/monaco-editor/0.6.1/min/vs'
            }
          };

        return (
            <MonacoEditor width="100%" requireConfig={requireConfig} height="95%" />
        );
    }
}

ReactDOM.render( <App />, document.getElementById("root"));