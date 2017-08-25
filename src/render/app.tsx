import * as React from "react";
//import * as ReactDOM from "react-dom";
import { render } from 'react-dom';
import MonacoEditor from "react-monaco-editor";

class App extends React.Component {
    state: any;

    constructor(props: any) {
        super(props);
        this.state = {
            code: '// type your code...',
        }
    }
    editorDidMount(editor: any, monaco: any) {
        console.log('editorDidMount', editor);
        editor.focus();
    }
    onChange(newValue: any, e: any) {
        console.log('onChange', newValue, e);
    }
    render() {
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true
        };
        return (
            <MonacoEditor
                width="800"
                height="600"
                language="javascript"
                theme="vs-dark"
                value={code}
                options={options}
                onChange={this.onChange}
                editorDidMount={this.editorDidMount} />);
    }
}

render(<App />, document.getElementById('root'));