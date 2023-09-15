
/*
# FileDiff

Version: 1.0.0<br>
Author: Jumar B. Hamac<br>
Copyright: droidscript.org

An extension to view file difference and compare and merge codes.
*/

editor.registerExtension("FileDiff", {
    version: "1.0.0",
    desc: "Compare and merge codebase."
}, function() {
    var extName = "FileDiff";
    var tabWindow = null;
    const fileTypes = "js,html,css,json,inc,txt,md";
    editor.addFileMenu("Compare to file", "compare", function( tab ) {
        tabWindow = tab;
        var ext = tab.fileName.substr(tab.fileName.lastIndexOf(".")+1).toLowerCase(),
        	ext2 = "";
        editor.chooseFile( fileTypes, function(file, name) {
            ext2 = name.substr(name.lastIndexOf(".")+1).toLowerCase();
            if( file.startsWith("/") ) file = file.substr(1);
            if(ext == ext2) {
                var options = JSON.parse( JSON.stringify(tabWindow.options) );
                options.fileDiff = {
                    src: file,
                    fileName: name
                }
                var filePath = tabWindow.filePath;
                tabWindow.close();
                editor.open(filePath, options);
            }
            else {
                editor.showMessage("File type is not the same.");
            }
        });
    }, fileTypes, "code-editor");
});
