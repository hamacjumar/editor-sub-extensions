
/*
# MarkdownLiveViewer

Version: 1.0.0<br>
Author: Jumar B. Hamac<br>
Copyright: droidscript.org

Live viewer and editor for markdown files.

`MarkdownLiveViewer` will add a `"md-live-view"` type of TabWindow which you can use to open your markdown file.

Example usage:

```
editor.open("/MyProject/markdown-file.md", {
	type: "md-live-view"
});
```

Uses the **MarkedJS** library. See more details here https://marked.js.org/.


> NOTE: You can also manually set the `"md-live-view"` as the default tab type when opening markdown files in the **Set Defaults** section in the Editor Settings.

### Notable releases

Version 1.0.0 - October 06, 2023
- Initial release.
*/

editor.registerExtension("MarkdownLiveViewer", {
    version: "1.0.0",
    desc: "View and edit json files."
}, function() {
    
    const extName = "MarkdownLiveViewer";
    const tabType = "md-live-view";
    let tabs = [], isResizing = false, startX, startWidth, dx, box1, box2, curObj;
    
    var opt = {
        fileTypes: ["md"],
        extName: extName
    }
    editor.addTabType(tabType, opt, renderWindow);
    
    function renderWindow( tab ) {
        tab.layout.options = "Horizontal,Left";
        tab.options.savable = true;
        
        const left = ui.addLayout(tab.layout, "Linear", "", 0.5, 1);
        left._div.style.flex = "";
        
        const dragger = ui.addLayout(tab.layout, "", "", "8px", 1);
        dragger._div.style.cursor = "col-resize";
        dragger.backColor = "#3e4347";
        dragger._div.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
       	document.addEventListener("mousemove", onMouseMove);
        
        const right = ui.addLayout(tab.layout, "Linear", "", 0.5, 1);
        right._div.style.flex = "";
        right.width = "calc(50% - 8px)";
        right.backColor = "#fff";
        
        const iframe = document.createElement("iframe");
        iframe.srcdoc = `
        	<html>
            <head>
            	<title>Preview</title>
            </head>
            <body>
            </body>
            </html>`;
        iframe.style.boxSizing = "border-box";
        iframe.frameborder = 0;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = 0;
        // iframe.sandbox = "allow-same-origin allow-top-navigation-by-user-activation";
        right._div.appendChild( iframe );
        
		tab.mdLiveViewId = dragger._div.id;
		tabs.push({ id: dragger._div.id, tab, left, right, iframe });
		
		// code editor
        var cmOptions = {
            mode: "markdown",
            theme: main.config.themes.md || "ds-md-txt",
            lineNumbers: true,
            tabSize: main.config.tabSize || 4,
            indentUnit: main.config.tabSize || 4,
            lineWrapping: main.config.lineWrap || false,
            extraKeys: {
                "Enter": tab.onEnter.bind(tab),
                "Cmd-Z": tab.undo.bind(tab),
                "Ctrl-Z": "undo",
                "Cmd-Y": tab.redo.bind(tab),
                "Ctrl-Y": "redo",
                "Cmd-/": tab.onComment.bind(tab),
                "Ctrl-/": tab.onComment.bind(tab),
                "Ctrl-S": tab.save.bind(tab),
                "Cmd-S": tab.save.bind(tab),
                "Alt-R": ext.Play,
                "Alt-S": ext.Stop,
                "Ctrl-F": tab.startSearch.bind(tab),
                "Cmd-F": tab.startSearch.bind(tab),
                "Ctrl-Q": function(cm) { cm.foldCode(cm.getCursor()) }
            },
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            autoCloseBrackets: true,
            styleActiveLine: true,
            styleSelectedText: true,
            matchBrackets: true,
            search: true,
            highlightSelectionMatches: {
                showToken: false// /\w/
            },
            scrollbarStyle: "simple"
        }
        
        // codemirror textarea
        var textArea = document.createElement( "textarea" );
        left._div.appendChild( textArea );
        
        // initialize codemirror editor
        var cdmEditor = CodeMirror.fromTextArea(textArea, cmOptions);
        
        // set the codemirror font-size
        let cdmEl = left._div.querySelector(".CodeMirror");
        cdmEl.style.fontSize = main.config.fontSize+"px";
        
        cdmDoc = cdmEditor.getDoc();
        cdmEditor.setSize("100%", "100%");
        
        tab.codeEditor = cdmEditor;
        tab.doc = cdmDoc;
        tab.codeEditor.on("change", tab.onChange.bind(tab));
        tab.codeEditor.on("keydown", tab.onKeyDown.bind(tab));
        tab.codeEditor.on("cursorActivity", tab.cursorActivity.bind(tab));
        tab.codeEditor.on('focus', () => { main.activeEditor = tab; });
        
        // get the contents of the json file in DroidScript
        editor.file.read("/"+tab.filePath, data => {
            cdmEditor.setValue( data );
            setTimeout( () => {
                iframe.contentDocument.body.innerHTML = marked.parse( data );
            }, 1000);
        });
    }
    
    editor.addListener("onChange", function( data ) {
        let tab = data.tab;
        if(tab.type == tabType) {
            let mdStr = tab.codeEditor.getValue();
            let i = tabs.findIndex(m => m.id == tab.mdLiveViewId);
            if(i == -1) return;
            let obj = tabs[i];
            obj.iframe.contentDocument.body.innerHTML = marked.parse( mdStr );
        }
    });
    
    function onMouseDown( e ) {
        startX = e.clientX;
        let i = tabs.findIndex(m => m.id == e.target.id);
        curObj = null;
        if(i == -1) {
            isResizing = false;
            return;
        }
        isResizing = true;
        curObj = tabs[i];
        curObj.iframe.style.pointerEvents = "none";
        box1 = curObj.left._div.getBoundingClientRect();
        box2 = curObj.right._div.getBoundingClientRect();
    }
    
    function onMouseMove( e ) {
        if(!isResizing || !curObj) return;
        dx = e.clientX - startX;
        curObj.left.width = (box1.width + dx) + "px";
        curObj.right.width = (box2.width - dx) + "px";
    }
    
    function onMouseUp( e ) {
        isResizing = false;
        if( curObj ) {
            curObj.iframe.style.pointerEvents = "auto";
            curObj = null;
        }
    }
    
    editor.showControl("editActions", tabType);
    
    var opt1 = {
        show: {
            fileType: "md",
            tabType: tabType
        }
    };
    var btg1 = editor.addHeaderItem("format_bold,format_italic,format_underline", opt1, handleEditActions);
    btg1.toolTips = ["Bold", "Italic", "Underline"];
    var btg2 = editor.addHeaderItem("format_list_bulleted,format_list_numbered", opt1, handleEditActions);
    btg2.toolTips = ["Bulleted list", "Numbered list"];
    var btg3 = editor.addHeaderItem("code,add_photo_alternate,add_link", opt1, handleEditActions);
    btg3.toolTips = ["Insert code", "Insert image", "Insert link"];

    var arr = [1,2,3,4,5,6];
    var hdp = ui.addDropdown(editor.header.left, arr.map(m => "Heading " + m), "Small");
    hdp.hide();
    hdp.label = "Headings";
    hdp.height = "1.75rem";
    hdp.setOnTouch( handleEditActions );
    editor.registerHeaderItem(hdp, { tabType: tabType });
    
    function handleEditActions( action ) {
        let tab = editor.tab.getActive();
        let codeEditor = tab.tab.codeEditor;
		var from = codeEditor.getCursor("from");
        var sct = codeEditor.getSelection();
        let line = codeEditor.getLine(from.line);
        if( action.includes("Heading") ) {
            codeEditor.setSelection({line: from.line, ch: 0}, {line: from.line, ch: line.length});
        }
        var rpt = renderStyle(sct, action, line, from);
        codeEditor.replaceSelection( rpt.txt );
        if( rpt.sel ) {
            codeEditor.setSelection(rpt.sel.from, rpt.sel.to);
        }
        else if( sct.trim() ) {
            codeEditor.setSelection(from, {line: from.line, ch: from.ch + rpt.txt.length});
        }
        else {
            codeEditor.setCursor({line: from.line + rpt.ln, ch: from.ch + rpt.mid});
    	}
        codeEditor.focus();
    }
    
    function renderStyle(text="", type="", line, from) {
        var t = text + "", u, reg, mid, ln=0, sel;
        t = t.trim();
        if(type == "format_bold") {
            reg = /^\*\*[\s\S]*\*\*$/;
  			if( reg.test(t) ) u = t.substring(2, t.length-2);
        	else u = "**"+t+"**";
        	mid = 2;
        }
        else if(type == "format_italic") {
            reg = /^\*[\s\S]*\*$/;
  			if( reg.test(t) ) u = t.substring(1, t.length-1);
        	else u = "*"+t+"*";
        	mid = 1;
        }
        else if(type == "format_underline") {
            if(t.startsWith("<u>") && t.endsWith("</u>")) u = t.substring(3, t.length-4);
            else u = "<u>" + t + "</u>";
            mid = 3;
        }
        else if(type == "format_list_bulleted") {
            let v = text.split("\n");
            v = v.map(m => {
                var a = m.trim();
                var b = "- " + a;
                m = m.replace(a, b);
                return m;
            });
            t = text;
            u = v.join("\n");
            if( !text.trim() ) u = "- ";
            mid = 2;
        }
        else if(type == "format_list_numbered") {
            let v = text.split("\n");
            v = v.map((m, i) => {
                var a = m.trim();
                var b = (i + 1) + ". " + a;
                m = m.replace(a, b);
                return m;
            });
            t = text;
            u = v.join("\n");
            if( !text.trim() ) u = "1. ";
            mid = 3;
        }
        else if(type == "code") {
            if(!t && line.trim()) {
                t = text;
                mid = 1;
                u = "``";
            }
            else if(!t && !line.trim()) {
                t = text;
                ln = 1;
                mid = 0;
                u = "```\n\n```";
            }
            else if(t && (t.includes("\n") || t == line.trim())) {
                u = "```\n"+t+"\n```";
                mid = 1;
            }
            else if(t && line.trim()) {
                u = "`"+t+"`";
                mid = 1;
            }
        }
        else if(type == "add_photo_alternate") {
            if( t ) {
                u = "![Alt text]("+t+")";
                mid = 12;
                sel = {
                    from: {
                        line: from.line,
                        ch: from.ch + 12
                    },
                    to: {
                        line: from.line,
                        ch: from.ch + 12 + t.length
                    }
                }
            }
            else {
                u = "![Alt text](https://image-url.png)";
                mid = 12;
                sel = {
                    from: {
                        line: from.line,
                        ch: from.ch + 12
                    },
                    to: {
                        line: from.line,
                        ch: from.ch + 33
                    }
                }
            }
        }
        else if(type == "add_link") {
            if( t ) {
                u = "["+t+"](https://link-url.html)";
                sel = {
                    from: {
                        line: from.line,
                        ch: from.ch + 1
                    },
                    to: {
                        line: from.line,
                        ch: from.ch + 1 + t.length
                    }
                }
            }
            else {
                u = "[Link text](ttps://link-url.html)";
                sel = {
                    from: {
                        line: from.line,
                        ch: from.ch + 1
                    },
                    to: {
                        line: from.line,
                        ch: from.ch + 10
                    }
                }
            }
        }
        else if( type.includes("Heading") ) {
            text = line;
            t = line, r = line.trimLeft();
            if( /^#+/.test(line) ) {
                r = line.replace(/^#+/, '');
                r = r.trimLeft();
            }
            if(type == "Heading 1") u = "# "+r;
            else if(type == "Heading 2") u = "## "+r;
            else if(type == "Heading 3") u = "### "+r;
            else if(type == "Heading 4") u = "#### "+r;
            else if(type == "Heading 5") u = "##### "+r;
            else u = "###### "+r;
            mid = parseInt(type.split()[1]);
        }
        return {txt: text.replace(t, u), mid, ln: ln, sel};
    }

    editor.tab.addListener("onClose", onTabClose);

    function onTabClose( tab ) {
        if(tab.type == tabType) {
            tabs = tabs.filter(m => m.id !== tab.tab.mdLiveViewId);
        }
    }
});