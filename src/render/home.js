import Ace, { EditSession, UndoManager } from 'ace';
const fs = require("fs");

const JavaScriptMode = Ace.require("ace/mode/javascript").Mode;
const CSharpMode = Ace.require("ace/mode/csharp").Mode;
const MarkdownMode = Ace.require("ace/mode/markdown").Mode;

export class HomeEditor {
    constructor(div) {
        var editor = Ace.edit(div);

        this.initialize(editor);
        this.setEditorTitle("Home");
        this.setVim(editor);
        this.registerEvents(editor);

        this.editor = editor;
    }
    getEditor() {
        return this.editor;
    }

    editFile(editor, file) {
        this.file = file;
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
                if(file) this.save(editor);
            },
            readOnly: false // false if this command should not apply in readOnly mode
        });
    }

    save(editor) {
        let value = editor.getValue();
        fs.writeFile(this.file, value, (err) => {
            if(err) {
                console.log(err);
            }else {
                this.setEditorTitle("save");
            }
        })
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
                el.setAttribute("class", "icon icon-pencil");
            else 
                el.setAttribute("class", "icon icon-home");
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