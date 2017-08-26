import Ace, { EditSession, UndoManager } from 'ace';

function init(editor) {
    editor.setTheme("ace/theme/gob");
    editor.setHighlightActiveLine(true);
    editor.setHighlightSelectedWord(true);
    editor.setShowInvisibles(false);
}

function setEditorTitle(text) {
    document.title = text;
}

function setVim(editor) {
    //var vim = require("ace/keyboard/vim").handler;
    editor.setKeyboardHandler("ace/keyboard/vim");
}

function setText(editor, text, mode) {
    editor.session.setMode(mode);
    editor.setValue(text);
}

function main() {
    var JavaScriptMode = Ace.require("ace/mode/javascript").Mode;
    var CSharpMode = Ace.require("ace/mode/csharp").Mode;
    var vim = Ace.require("vim");
    var editor = Ace.edit("editor");
    init(editor);

    setText(editor, "Hello, world", new CSharpMode());
    setEditorTitle("Home");
    setVim(editor);
}

main();