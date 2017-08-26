import Ace, { EditSession, UndoManager } from 'ace';

export class  HomeEditor {

    constructor(div) {
        var editor = Ace.edit(div);

        console.log(editor);

        var JavaScriptMode = Ace.require("ace/mode/javascript").Mode;
        var CSharpMode = Ace.require("ace/mode/csharp").Mode;
        var vim = Ace.require("vim");

        this.initialize(editor);
        this.setText(editor, "Hello, world", new CSharpMode());
        this.setEditorTitle("Home");
        this.setVim(editor);
    }

    initialize(editor) {
        editor.setTheme("ace/theme/gob");
        editor.setHighlightActiveLine(true);
        editor.setHighlightSelectedWord(true);
        editor.setShowInvisibles(false);
    }

    setEditorTitle(text) {
        document.title = text;
    }

    setVim(editor) {
        editor.setKeyboardHandler("ace/keyboard/vim");
    }

    setText(editor, text, mode) {
        editor.session.setMode(mode);
        editor.setValue(text);
    }
}