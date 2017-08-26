import Ace, { EditSession, UndoManager } from 'ace';

var JavaScriptMode = Ace.require("ace/mode/javascript").Mode;
var CSharpMode = Ace.require("ace/mode/csharp").Mode;
var vim = Ace.require("vim");

var editor = Ace.edit("editor");
editor.setTheme("ace/theme/gob");
editor.session.setMode(new CSharpMode());

editor.setKeyboardHandler("vim");