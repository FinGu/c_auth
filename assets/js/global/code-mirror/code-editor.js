(function ($) {
    "use strict";
    var editorOne = CodeMirror.fromTextArea(document.getElementById("code-1"), {
        lineNumbers: true,
        matchBrackets: true,
        styleActiveLine: true,
        theme: "blackboard"
    });
    var editorTwo = CodeMirror.fromTextArea(document.getElementById("code-2"), {
        lineNumbers: true,
        matchBrackets: true,
        styleActiveLine: true,
    });
})(jQuery);