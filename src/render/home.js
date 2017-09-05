import Ace, { EditSession, UndoManager } from 'ace';
import { getCurrentDir, getArgs } from "./utility";

const fs = require("fs");

export class HomeEditor {
    constructor(div) {
        var editor = Ace.edit(div);
        this.initialize(editor);
        this.setEditorTitle("Home");
        this.setVim(editor);
        this.registerEvents(editor);
        this.editor = editor;

        editor.setOptions({
            fontFamily: "Iosevka-Light",
            fontSize: "10pt"
        });
    }

    getMode(file) {
        let ext = file.split('.').pop();
        if (ext == "cs" || ext == "csx")  
            return Ace.require("ace/mode/csharp").Mode;
        else if (ext == "fs" || ext == "fsx")
            return Ace.require("ace/mode/csharp").Mode;
        else if (ext == "js" || ext == "jsx")
            return Ace.require("ace/mode/javascript").Mode;
        else if (ext == "properties")
            return Ace.require("ace/mode/properties").Mode;
        else if (ext == "json") 
            return Ace.require("ace/mode/json").Mode;
        else if (ext == "css") 
            return Ace.require("ace/mode/css").Mode;
        else
            return Ace.require("ace/mode/markdown").Mode;
    }

    getEditor() {
        return this.editor;
    }

    editFile(file) {
        var editor = this.editor;
        if (file) {
            this.file = file;
            let Mode = this.getMode(file);
            
            if (fs.existsSync(file)) {
                var content = fs.readFileSync(file, "utf8");
                this.setText(editor, content, new Mode());
                let session = editor.getSession()
                session.on("change", () => {
                    //this.setEditorTitle("*");
                });

                editor.gotoLine(0);
            }
        }
    }

    registerEvents(editor) {
        editor.commands.addCommand({
            name: 'save',
            bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
            exec: (editor) => {
                if(this.file) this.save(editor);
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
        // editor.setTheme("ace/theme/gob");
        editor.setTheme("ace/theme/monokai");
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