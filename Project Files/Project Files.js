
/*
# Project Files

Version: 1.1.5<br>
Author: Jumar B. Hamac<br>
Copyright: droidscript.org

An extension to view and edit the files in the root directory of your project.
*/

editor.registerExtension("Project Files", {
    version: "1.1.5",
    desc: "View your project root files."
}, function() {
    const extName = "Project Files";
    
    var folders = "Html,Misc,Img,Snd";
    var fileTypes = "js,html,css,md,txt,png,jpg,jpeg,mpeg,json,py";
    var list = [];
    var langs = {
      js: "JavaScript",
      html: "HTML",
      css: "CSS",
      md: "Markdown",
      txt: "Plain Text",
      png: "PNG Image",
      jpg: "JPEG Image",
      jpeg: "JPEG Image",
      mpeg: "MPEG Video",
      json: "JSON",
      py: "Python"
    };
    
    
    if(!editor.dir.appName || editor.dir.appName == "/") {
        editor.reload();
    }
    
    var leftPanel = editor.getLeftPanel( extName );
    var listFiles = editor.addList(leftPanel, [], "Image,Search", 1, 1);
    // listFiles._div.style.height = "calc(100% - 36px)";
    listFiles.setOnTouch(function(item, i) {
        var ext = item[1].substr(item[1].lastIndexOf(".")+1).toLowerCase();
        editor.open(editor.dir.appName+"/"+item[1], {
            // type: "code-editor",
            open: true
        });
        langItem.setText(langs[ext] || "Unknown File");
    });
    
    var options = {
        position: "top",
        title: extName
    }
    
    var navItem = editor.addNavBarItem("folder", options, function() {
        leftPanel.toggle();
    });
    
    var langItem = editor.addStatusBarItem();
    
    editor.dir.listFolder( editor.dir.appName, function( data ) {
        if(data.status == "ok" && data.list.length) {
            data.list = data.list.filter( m => {
                return !m.startsWith("~") && !folders.includes(m) && m.includes(".");
            });
            let ext, img;
            list = data.list.map(m => {
                ext = m.substr(m.lastIndexOf(".")+1).toLowerCase();
                img = editor.dir.getExtFilePath(editor.name, "Img/file.png");
                if( fileTypes.includes(ext) ) {
                    img = editor.dir.getExtFilePath(editor.name, "Img/"+ext+".png");
                }
                return [img, m];
            });
            listFiles.list = list;
        }
    });
    
    // highlight active file
    editor.tab.addListener("onSelect", function( data ) {
        let n = list.findIndex( m => editor.dir.appName+"/"+m[1] == data.filePath);
        listFiles.active = n;
        var ext = data.filePath.substr(data.filePath.lastIndexOf(".")+1).toLowerCase();
        langItem.setText(langs[ext] || "Unknown File");
    });
    
    editor.tab.addListener("onClose", function( data ) {
        var tab = editor.tab.getActive();
        let n = -1;
        if( tab ) {
             n = list.findIndex( m => editor.dir.appName+"/"+m[1] == tab.filePath);
        }
        listFiles.active = n;
    });
    
    editor.file.addListener("onCreate", data => {
        const m = data.fileName;
        const ext = m.substr(m.lastIndexOf(".")+1).toLowerCase();
        let img = editor.dir.getExtFilePath(editor.name, "Img/file.png");
        if( fileTypes.includes(ext) ) {
            img = editor.dir.getExtFilePath(editor.name, "Img/"+ext+".png");
        }
        list.push([img, m]);
        listFiles.list = list;
    });
    
    editor.file.addListener("onDelete", data => {
        const m = data.fileName;
        const n = list.findIndex(f => f[1] == m);
        if(n >= 0) {
            list.splice(n, 1);
            listFiles.list = list;
        }
    });
    
    editor.tab.addListener("onOpen", function(data) {
        var ext = data.filePath.substr(data.filePath.lastIndexOf(".")+1).toLowerCase();
        langItem.setText(langs[ext] || "Unknown File");
    })
});
