
/*
# SplitView

Version: 1.0.0<br>
Author: Jumar B. Hamac<br>
Copyright: droidscript.org

An extension to view TabWindows side by side.
*/

editor.registerExtension("SplitView", {
    version: "1.0.0",
    desc: "View your project root files."
}, function() {
    var extName = "SplitView";
    editor.addFileMenu("Open to the right", "call_split", function( tab ) {
        var options = JSON.parse( JSON.stringify(tab.options) );
        var filePath = tab.filePath;
        var index = tab.index;
        var n = index - 1;
        var tabs = editor.tab.getAll();
        for(var i=n; i>=0; i--) {
            if(tabs[i].options.splitView == tab.options.splitView) {
                n = i;
                break;
            }
        }
        tab.close();
        options.splitView = true;
        editor.open(filePath, options);
        editor.tab.open(n);
    });
});

