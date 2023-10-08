
/*
# JSONTreeView

Version: 1.0.1<br>
Author: Jumar B. Hamac<br>
Copyright: droidscript.org

An extension to view and edit json files in a treeview format.

`JSONTreeView` will add a `"json-tree-view"` type of TabWindow which you can use to open your json file.

Example usage:

```
editor.open("/MyProject/data.json", {
	type: "json-tree-view"
});
```

Uses the **JSONView** library by **richard-livingston**

GitHub: *https://github.com/richard-livingston/json-view*

> NOTE: You can also manually set the `"json-tree-view"` as the default tab type when opening json files in the **Set Defaults** section in the Editor Settings.

### Notable releases

Version 1.0.1 - October 06, 2023
- Remove JSONTreeView instance to the jsonViews array when the corresponding tab is close.

Version 1.0.0 - September 30, 2023
- Initial release.
*/

editor.registerExtension("JSONTreeView", {
    version: "1.0.1",
    desc: "View and edit json files."
}, function() {
    
    const extName = "JSONTreeView";
    let count = 1;
    let valueIsSet = false;
    let jsonViews = [];
    let showCount = true;
    let filterText = "";
    let tabs = [], isResizing = false, startX, dx, box1, box2, curObj;

    var ftrField = ui.addTextField(editor.header.left, "", "Outlined,Small");
    ftrField.height = "1.75rem";
    ftrField.placeholder = "JSON filter";
    ftrField.textSize = "0.9rem";
    ftrField.setOnChange(function( value ) {
        let tab = editor.tab.getActive();
        let jsonView = jsonViews.filter(m => m.id == tab.tab.jsonViewId)[0];
        jsonView.filterText = value;
        filterText = value;
    });
    ftrField.hide();
    editor.registerHeaderItem(ftrField, { tabType: "json-tree-view" });

    var hlp = ui.addButtonGroup(editor.header.left, "help_outline", "Small,Icon");
    hlp.toolTips = ["JSON editor helper"];
    hlp.setOnTouch( showJSONHelper );
    editor.registerHeaderItem(hlp, { tabType: "json-tree-view" });
    hlp.hide();

    function showJSONHelper() {
        const lay = ui.addLayout(null, "Linear", "Vertical,Left");
        lay.padding = "1rem";

        ui.addText(lay, "JSON Helper");

        ui.addDivider(lay, 1);

        const swt = ui.addSwitch(lay, "Show property count", "Right", 1);
        swt.value = showCount;
        swt.setOnTouch(value => {
            let tab = editor.tab.getActive();
            let jsonView = jsonViews.filter(m => m.id == tab.tab.jsonViewId)[0];
            jsonView.showCountOfObjectOrArray = value;
            showCount = value;
        });

        const txt = ui.addText(lay, "Hint: Double click the property name or value to edit.", "body2,TextSecondary,Italize");
        txt.margins = [0, "1rem"];

        ui.showPopover(this, lay, "br,tl");
    }

    var opt = {
        fileTypes: ["json"],
        extName: extName
    }
    editor.addTabType("json-tree-view", opt, renderWindow);
    
    function renderWindow( tab ) {
        
        tab.layout.options = "Horizontal";
        tab.options.savable = true;

        var left = ui.addLayout(tab.layout, "Linear", "Left,ScrollY,NoScrollBar", 0.5, 1);
        left.setPadding(1, 0.5, 1, 0, "rem");
        left._div.style.flex = "";
        
        const dragger = ui.addLayout(tab.layout, "", "", "8px", 1);
        dragger._div.style.cursor = "col-resize";
        dragger.backColor = "#3e4347";
        dragger._div.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
       	document.addEventListener("mousemove", onMouseMove);
        
        var right = ui.addLayout(tab.layout, "Linear", "", 0.5, 1);
        right._div.style.flex = "";
        right.width = "calc(50% - 8px)";
        right.backColor = "#fff";
        
        // json tree view
        var jsonView = new window["JSONTreeView"]("root", {}, null);
        jsonView.id = count;
        jsonView.readonlyWhenFiltering = true;

        jsonView.expand(true);
        jsonView.withRootName = false;

        jsonView.on('change', (self, keyPath, oldValue, newValue) => { 
            onJSONTreeChange( jsonView.id );
            // console.log('change', keyPath, oldValue, '=>', newValue);
        });
        jsonView.on('rename', (self, keyPath, oldName, newName) => {
            onJSONTreeChange( jsonView.id );
            // console.log('rename', keyPath, oldName, '=>', newName);
        });
        jsonView.on('delete', (self, keyPath, value, parentType) => {
            onJSONTreeChange( jsonView.id );
            // console.log('delete', keyPath, '=>', value, parentType);
        });

        left._div.appendChild(jsonView.dom);

        tab.jsonViewId = count;

        // code editor
        var cmOptions = {
            mode: {name: "javascript", json: true},
            theme: main.config.themes.json || "ds-md-css",
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
        right._div.appendChild( textArea );
        
        // initialize codemirror editor
        var cdmEditor = CodeMirror.fromTextArea(textArea, cmOptions);
        
        // set the codemirror font-size
        let cdmEl = right._div.querySelector(".CodeMirror");
        cdmEl.style.fontSize = main.config.fontSize+"px";


        // get the contents of the json file in DroidScript
        editor.file.read("/"+tab.filePath, function( data ) {
            cdmEditor.setValue( data );
            valueIsSet = false;
            jsonView.value = JSON.parse( data );
            jsonView.refresh();
            valueIsSet = true;
        });
        
        cdmDoc = cdmEditor.getDoc();
        cdmEditor.setSize("100%", "100%");
        
        tab.codeEditor = cdmEditor;
        tab.doc = cdmDoc;
        tab.codeEditor.on("change", tab.onChange.bind(tab));
        tab.codeEditor.on("keydown", tab.onKeyDown.bind(tab));
        tab.codeEditor.on("cursorActivity", tab.cursorActivity.bind(tab));
        tab.codeEditor.on('focus', () => { main.activeEditor = tab; });
        
        // push the json tree view into the global array
        jsonViews.push( jsonView );

        tabs.push({id: dragger._div.id, left, right, jsonViewId: count});
        
        // increment the jsonView id counter
        count ++;
    }

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
        if( curObj ) curObj = null;
    }
    
    editor.addListener("onChange", async function( data ) {
        if(!data.change.text.join("").trim() && !data.change.removed.join("").trim()) return;
        let tab = data.tab;
        if(tab.type == "json-tree-view") {
            let jsonStr = tab.codeEditor.getValue();
            try {
                let json = await JSON.parse( jsonStr );
                valueIsSet = false;
                let jsonView = jsonViews.filter(m => m.id == tab.jsonViewId)[0];
                jsonView.value = json;
                jsonView.refresh();
                valueIsSet = true;
            } catch( err ) {
                console.log(err);
            }
        }
    });
    
    function onJSONTreeChange( id ) {
        let tabs = editor.tab.getAll();
        let i = tabs.findIndex(m => m.jsonViewId == id);
        let tabWindow = tabs[i];
        let jsonView = jsonViews.filter(m => m.id == id)[0];
        if(tabWindow && jsonView && valueIsSet) {
            tabWindow.codeEditor.setValue( JSON.stringify(jsonView.value, null, main.config.tabSize) );
            tabWindow.hasChanges = true;
            tabWindow.tabButton.hasChanges = true;
        }
    }

    editor.tab.addListener("onSelect", applySettingsToJson);

    editor.tab.addListener("onOpen", applySettingsToJson);

    function applySettingsToJson( tab ) {
        if(tab.type == "json-tree-view") {
            let jsonView = jsonViews.filter(m => m.id == tab.tab.jsonViewId)[0];
            jsonView.filterText = filterText;
            jsonView.showCountOfObjectOrArray = showCount;
        }
    }

    editor.tab.addListener("onClose", onTabClose);

    function onTabClose( tab ) {
        if(tab.type == "json-tree-view") {
            jsonViews = jsonViews.filter(m => m.id !== tab.tab.jsonViewId);
        }
    }
    
    editor.showControl("runActions,editActions,foldActions,refresh", "json-tree-view");
});