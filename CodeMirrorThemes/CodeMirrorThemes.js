
/*
# CodeMirrorThemes

Version: 1.0.0<br>
Exported By: Jumar B. Hamac<br>


This is an extension for adding some CodeMirror themes to the code editor.

Themes:

- `Monokai`<br>
	Author: CodeMirror<br>
	The monokai theme is copied from the CodeMirror source monokai theme.

- `Dracula`<br>
	Author: Michael Kaminsky (http://github.com/mkaminsky11)<br>
	Original dracula color scheme by Zeno Rocha (https://github.com/zenorocha/dracula-theme)
*/

editor.registerExtension("CodeMirrorThemes", {
    version: "1.0.0",
    desc: "Free themes from CodeMirror"
}, function() {
var extName = "CodeMirrorThemes";

   var monokaiCss = `
       /* Based on Sublime Text's Monokai theme */

    .cm-s-monokai.CodeMirror { background: #272822; color: #f8f8f2; }
    .cm-s-monokai div.CodeMirror-selected { background: #49483E; }
    .cm-s-monokai .CodeMirror-line::selection, .cm-s-monokai .CodeMirror-line > span::selection, .cm-s-monokai .CodeMirror-line > span > span::selection { background: rgba(73, 72, 62, .99); }
    .cm-s-monokai .CodeMirror-line::-moz-selection, .cm-s-monokai .CodeMirror-line > span::-moz-selection, .cm-s-monokai .CodeMirror-line > span > span::-moz-selection { background: rgba(73, 72, 62, .99); }
    .cm-s-monokai .CodeMirror-gutters { background: #272822; border-right: 0px; }
    .cm-s-monokai .CodeMirror-guttermarker { color: white; }
    .cm-s-monokai .CodeMirror-guttermarker-subtle { color: #d0d0d0; }
    .cm-s-monokai .CodeMirror-linenumber { color: #d0d0d0; }
    .cm-s-monokai .CodeMirror-cursor { border-left: 1px solid #f8f8f0; }

    .cm-s-monokai span.cm-comment { color: #75715e; }
    .cm-s-monokai span.cm-atom { color: #ae81ff; }
    .cm-s-monokai span.cm-number { color: #ae81ff; }

    .cm-s-monokai span.cm-comment.cm-attribute { color: #97b757; }
    .cm-s-monokai span.cm-comment.cm-def { color: #bc9262; }
    .cm-s-monokai span.cm-comment.cm-tag { color: #bc6283; }
    .cm-s-monokai span.cm-comment.cm-type { color: #5998a6; }

    .cm-s-monokai span.cm-property, .cm-s-monokai span.cm-attribute { color: #a6e22e; }
    .cm-s-monokai span.cm-keyword { color: #f92672; }
    .cm-s-monokai span.cm-builtin { color: #66d9ef; }
    .cm-s-monokai span.cm-string { color: #e6db74; }

    .cm-s-monokai span.cm-variable { color: #f8f8f2; }
    .cm-s-monokai span.cm-variable-2 { color: #9effff; }
    .cm-s-monokai span.cm-variable-3, .cm-s-monokai span.cm-type { color: #66d9ef; }
    .cm-s-monokai span.cm-def { color: #fd971f; }
    .cm-s-monokai span.cm-bracket { color: #f8f8f2; }
    .cm-s-monokai span.cm-tag { color: #f92672; }
    .cm-s-monokai span.cm-header { color: #ae81ff; }
    .cm-s-monokai span.cm-link { color: #ae81ff; }
    .cm-s-monokai span.cm-error { background: #f92672; color: #f8f8f0; }

    .cm-s-monokai .CodeMirror-activeline-background { background: #373831; }
    .cm-s-monokai .CodeMirror-matchingbracket {
      text-decoration: underline;
      color: white !important;
    }
   `;
   
editor.addTheme("monokai", {
    name: "Monokai",
    description: "Based on Sublime Text's Monokai theme",
    author: "CodeMirror",
    fileType: "*"
}, monokaiCss);


var draculaCss = `/*
        Name:       dracula
        Author:     Michael Kaminsky (http://github.com/mkaminsky11)

        Original dracula color scheme by Zeno Rocha (https://github.com/zenorocha/dracula-theme)

    */


    .cm-s-dracula.CodeMirror, .cm-s-dracula .CodeMirror-gutters {
      background-color: #282a36 !important;
      color: #f8f8f2 !important;
      border: none;
    }
    .cm-s-dracula .CodeMirror-gutters { color: #282a36; }
    .cm-s-dracula .CodeMirror-cursor { border-left: solid thin #f8f8f0; }
    .cm-s-dracula .CodeMirror-linenumber { color: #6D8A88; }
    .cm-s-dracula .CodeMirror-selected { background: rgba(255, 255, 255, 0.10); }
    .cm-s-dracula .CodeMirror-line::selection, .cm-s-dracula .CodeMirror-line > span::selection, .cm-s-dracula .CodeMirror-line > span > span::selection { background: rgba(255, 255, 255, 0.10); }
    .cm-s-dracula .CodeMirror-line::-moz-selection, .cm-s-dracula .CodeMirror-line > span::-moz-selection, .cm-s-dracula .CodeMirror-line > span > span::-moz-selection { background: rgba(255, 255, 255, 0.10); }
    .cm-s-dracula span.cm-comment { color: #6272a4; }
    .cm-s-dracula span.cm-string, .cm-s-dracula span.cm-string-2 { color: #f1fa8c; }
    .cm-s-dracula span.cm-number { color: #bd93f9; }
    .cm-s-dracula span.cm-variable { color: #50fa7b; }
    .cm-s-dracula span.cm-variable-2 { color: white; }
    .cm-s-dracula span.cm-def { color: #50fa7b; }
    .cm-s-dracula span.cm-operator { color: #ff79c6; }
    .cm-s-dracula span.cm-keyword { color: #ff79c6; }
    .cm-s-dracula span.cm-atom { color: #bd93f9; }
    .cm-s-dracula span.cm-meta { color: #f8f8f2; }
    .cm-s-dracula span.cm-tag { color: #ff79c6; }
    .cm-s-dracula span.cm-attribute { color: #50fa7b; }
    .cm-s-dracula span.cm-qualifier { color: #50fa7b; }
    .cm-s-dracula span.cm-property { color: #66d9ef; }
    .cm-s-dracula span.cm-builtin { color: #50fa7b; }
    .cm-s-dracula span.cm-variable-3, .cm-s-dracula span.cm-type { color: #ffb86c; }

    .cm-s-dracula .CodeMirror-activeline-background { background: rgba(255,255,255,0.1); }
    .cm-s-dracula .CodeMirror-matchingbracket { text-decoration: underline; color: white !important; }
`;

editor.addTheme("dracula", {
    name: "Dracula",
    description: "Original dracula color scheme by Zeno Rocha (https://github.com/zenorocha/dracula-theme)",
    author: "Michael Kaminsky",
    github: "(http://github.com/mkaminsky11)",
    fileType: "*"
}, draculaCss);
})