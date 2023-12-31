
/*
# Img

Version: 1.1.0<br>
Author: Jumar Hamac<br>
Copyright: droidscript.org

This extension let's you view the images in the `Img/` folder of your project.

This extension uses the `ImageViewer` extension to view the images.
*/

editor.registerExtension("Img", {
    version: "1.1.0",
    desc: "View the Img/ folder"
}, function() {
    const extName = "Img";
    
    var imgList = [];
    var ext = "png,jpg,jpeg";
    
    var panel = editor.getLeftPanel( extName );
    var listFiles = editor.addList(panel, [], "Image", 1, 1);
    listFiles.setOnTouch( function(item, i) {
        var img = item;
        editor.open(img[0], {
            open: true,
            type: "image"
        });
    });
    
    var navBarOpt = {
        title: extName,
        show: {}
    }
    
    editor.addNavBarItem("photo", navBarOpt, function() {
        panel.toggle();
    });
    
    
    let files = editor.dir.listFolder(editor.dir.appName+"/Img", function( data ) {
        if(data.status == "ok") {
            initLeftPanel( data.list );
        }
    });
    
    function initLeftPanel( files ) {
        files = files.filter( m => {
            let ext = m.substr(m.lastIndexOf(".")+1).toLowerCase();
            return ext.includes( ext );
        });
        imgList = files.map((m, i) => {
            return [editor.dir.appName+"/Img/"+m, m, "", "", "inset"+i];
        });
        listFiles.list = imgList;
    }
    
    editor.file.addListener("onDelete", function( data ) {
        imgList = imgList.filter(m => {
            return (m[0] !== data.filePath && m[1]!== data.fileName);
        });
        listFiles.list = imgList;
    });
    
    editor.file.addListener("onRename", function( data ) {
        let n = imgList.findIndex(m => {
            return (m[0] == data.filePath && m[1] == data.fileName);
        });
        imgList[n] = [data.newFilePath, data.newFileName];
        listFiles.list = imgList;
        let tab = editor.tab.getActive();
        tab.tab.close();
        editor.open(data.newFilePath, {
            open: true,
            type: "image"
        });
    });
});
