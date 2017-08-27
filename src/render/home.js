import Ace, { EditSession, UndoManager } from 'ace';
const fs = require("fs");

export class HomeEditor {

    constructor(div, file) {
        var editor = Ace.edit(div);
        var JavaScriptMode = Ace.require("ace/mode/javascript").Mode;
        var CSharpMode = Ace.require("ace/mode/csharp").Mode;

        this.file = file;

        this.initialize(editor);
        this.setEditorTitle("Home");
        this.setVim(editor);
        this.registerEvents(editor);

        if (file) {
            if (fs.existsSync(file)) {
                var content = fs.readFileSync(file, "utf8");
                this.setText(editor, content, new CSharpMode());

                let session = editor.getSession()
                session.on("change", () => {
                    this.setEditorTitle("*");
                });
            }
        }
    }

    registerEvents(editor) {
        editor.commands.addCommand({
            name: 'save',
            bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
            exec: (editor) => {
                let value = editor.getValue();
                fs.writeFile(this.file, value, (err) => {
                    if(err) {
                        this.setEditorTitle(err);
                        console.log(err);
                    }else {
                        this.setEditorTitle("save");
                    }
                })
            },
            readOnly: false // false if this command should not apply in readOnly mode
        });
    }

    initialize(editor) {
        editor.setTheme("ace/theme/gob");
        editor.setHighlightActiveLine(true);
        editor.setHighlightSelectedWord(true);
        editor.setShowInvisibles(false);
    }

    setEditorTitle(text) {
        let el = document.getElementById("status-icon")
        if(el) {
            if(text === "*")
                el.setAttribute("class", "icon icon-github");
            else {
                el.setAttribute("class", "icon icon-home");
            }
        }
    }

    setVim(editor) {
        editor.setKeyboardHandler("ace/keyboard/vim");
    }

    setText(editor, text, mode) {
        editor.session.setMode(mode);
        editor.setValue(text);
    }
}