
/*
# OpenFile

Version: 1.0.2<br>
Author: Jumar B. Hamac<br>
Copyright: droidscript.org

An extension to open and edit any file in DroidScript directory.
*/

editor.registerExtension("OpenFile", {
    version: "1.0.2",
    desc: "Open and edit any file in DroidScript folder."
}, function() {
    var extName = "OpenFile";
    const showOnSidebar = true;
    
    var tabWindow = null;
    const fileTypes = "js,html,css,json,inc,txt,md,py,ttf";
    
    if( showOnSidebar ) {
     	editor.addNavBarItem("insert_drive_file", {
            title: "Open File"
        }, function() {
            editor.chooseFile( fileTypes, function(file, name) {
                editor.open(file.substr(1), {
                    type: "code-editor"
                })
            });
        });   
    }
});
