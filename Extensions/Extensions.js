/*
# Extensions

Version: 1.0.2<br>
Author: Jumar Hamac<br>
Copyright: droidscript.org

The Extensions section is also an extension.

Lets you view all the installed extension and view their documentation.

### Notable releases

Version 1.0.2
- Show system "JSONTreeView" extension docs.
- Show system "MarkdownLiveViewer" extension docs.

Version 1.0.2
- Show system "ImageViewer" extension docs.

*/
editor.registerExtension("Extensions", {
    version: "1.0.2",
    desc: "List of installed extensions"
}, function() {
    var extName = "Extensions";
    var extensions = [];
    var list = [];
    var editorExtensions = ["ImageViewer", "JSONTreeView", "MarkdownLiveViewer"];
    
    editor.addScript( editor.dir.getExtFilePath("Edit", "js/esprima.js") );
    
    var leftPanel = editor.getLeftPanel( extName );
    var listView = editor.addList(leftPanel, [], "icon", 1, 1);
    listView.setOnTouch( ViewDocs );
    listView.setOnAction( RemoveExtension );
    
    var navOptions = {
        title: "Extensions",
        position: "Bottom"
    }
    var navItem = editor.addNavBarItem("extension", navOptions, function() {
        leftPanel.toggle();
    });
    
    editor.addListener("onLoad", function() {
        var allExt = editor.getExtensions();
        var ext = {}, q = false;
        for(var extName in allExt) {
            ext = allExt[extName];
            q = !ext.src.includes("Edit/Editor");
            if(q || (!q && editorExtensions.includes(ext.name))) {
                list.push([ext.options.icon||"extension", ext.options.displayText, ext.options.desc, "close"]);
                extensions.push( ext );
            }
    	}
        listView.list = list;
    });
    
    function ViewDocs(item, i) {
        editor.file.read( extensions[i].src, function( code ) {
            const ast = esprima.parseScript(code, { comment: true });
            let comments = '', cmt = "", finalCmt = "";
            ast.comments.forEach( comment => {
                if(comment.type == "Block") {
                    cmt = comment.value.replace(/^\s*\*\s?/gm, '');
                    finalCmt = "";
                    if( cmt.includes("@param") ) {
                        cmt.split("\n").map(m => {
                            if( m.includes("@param") ) {
                                m = m.replace(/@param\s*{\s*/g, '');
                                if( !finalCmt.includes("| Name | Type") ) {
                                    finalCmt += "| Name | Type | Description |\n| --- | --- | --- |\n";
                                }
                                var o = m.split('}');
                                o[0] = o[0].trim();
                                o[1] = o[1].trim();
                                var n = o[1].substr(0, o[1].indexOf(" "));
                                var t = o[0];
                                var d = o[1].substr(o[1].indexOf(" "));
                                finalCmt += `| ${n} | ${t} | ${d} |\n`;
                                
                                console.log( `| ${n} | ${t} | ${d} |\n` );
                            }
                            else finalCmt += (m + "\n");
                        });
                    }
                    else finalCmt = cmt;
                    comments += '\n' + finalCmt;
                }
            });
            code = code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
            let apiCalls = getAllApiCalls( code );
            apiCalls = [...new Set(apiCalls)];
            apiCalls = apiCalls.map( m => "- "+m);
            comments += "\n\n### API Calls\n\n";
            comments += apiCalls.join("\n");
            editor.open(item[1]+" - Docs", {
                type: "markdown",
                value: comments,
                readOnly: true
            });
        });
    }
    
    function RemoveExtension(item, i) {
        editor.showDialog("Do you want to remove this extension?", {
            title: 'Remove "'+item[1]+'"',
            actions: "Close,Remove"
        }, function( text ) {
            if(text == "Remove") {
                editor.file.delete(extensions[i].src, function() {
                    extensions.splice(i, 1);
   	 				list.splice(i, 1);
   	 				listView.list = list;
                    editor.showMessage('"'+item[1]+'" extension removed successfully.', {action: "Reload", duration: 5000}, function() {
                        editor.reload();
                    });
                });
            }
        });
    }
    
    function getAllApiCalls( text ) {
        const regex = /editor\.[^\s]+\s/g;
        const matches = text.match(regex);
        return matches.map(m => {
            var ret = m.split(/[()+]/).shift();
            if( m.includes("(") ) ret += "()";
            return ret;
        });
    }
});
