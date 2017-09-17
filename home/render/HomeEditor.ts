const Ace = require("ace");
const fs = require("fs");

import { getCurrentDir, getArgs } from "./Utility";

export interface Editor { 
    setOptions: (any) => void;
    getSession: () => any;
    gotoLine: (number) => void;
    commands: any;
    getValue: () => any;
    setValue: (string) => any;
    setKeyboardHandler: (string) => any;
    session: any;
    setTheme: (string) => void ;
    setHighlightActiveLine: (boolean) => void;
    setHighlightSelectedWord: (boolean) => void;
    setShowInvisibles: (boolean) => void
}

export class HomeEditor {
    editor : Editor;
    file: string;

    constructor(private div) {
        let editor = Ace.edit(div);

        this.initialize(editor);
        this.setEditorTitle("Home");
        this.setVim(editor);
        this.registerEvents(editor);

        editor.setOptions({
            fontFamily: "Iosevka-Light",
            fontSize: "10pt"
        });
        editor.container.style.lineHeight = 1.5;

        this.editor = editor;
    }

    getMode(file) {
        let ext = file.split('.').pop();
        if (ext == "cs" || ext == "csx")  
            return Ace.require("ace/mode/csharp").Mode;
        else if (ext == "fs" || ext == "fsx")
            return Ace.require("ace/mode/csharp").Mode;
        else if (ext == "js" || ext == "jsx")
            return Ace.require("ace/mode/javascript").Mode;
        else if (ext == "ts" || ext == "tsx")
            return Ace.require("ace/mode/typescript").Mode;
        else if (ext == "properties")
            return Ace.require("ace/mode/properties").Mode;
        else if (ext == "json") 
            return Ace.require("ace/mode/json").Mode;
        else if (ext == "css") 
            return Ace.require("ace/mode/css").Mode;
        else
            return Ace.require("ace/mode/markdown").Mode;
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

    registerEvents(editor: Editor) {
        editor.commands.addCommand({
            name: 'save',
            bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
            exec: (editor) => {
                if(this.file) this.save(editor);
            },
            readOnly: false 
        });
    }

    save(editor: Editor) {
        let value = editor.getValue();
        fs.writeFile(this.file, value, (err) => {
            if(err) {
                console.log(err);
            }else {
                this.setEditorTitle("save");
            }
        })
    }

    initialize(editor: Editor) {
        editor.setTheme("ace/theme/monokai");
        //editor.setTheme("ace/theme/tomorrow_night_bright");
        //editor.setTheme("ace/theme/chaos");
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

    setVim(editor: Editor) {
        editor.setKeyboardHandler("ace/keyboard/vim");
    }

    setText(editor: Editor, text, mode) {
        editor.session.setMode(mode);
        editor.setValue(text);
    }
}