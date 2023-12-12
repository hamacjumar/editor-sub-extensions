
/*
# ImageViewer

Version: 1.1.2<br>
Author: Jumar Hamac<br>
Copyright: droidscript.org

A simple extension to view images.

`ImageViewer` will add an `"image"` type of TabWindow which you can use to open your image.

Example usage:

```
editor.open("/MyProject/Img/logo.png", {
	type: "image"
});
```

This will open a TabWindow to view the image.
*/

editor.registerExtension("ImageViewer", {
    version: "1.1.2",
    desc: "A simple image viewer extension."
}, function() {
    const extName = "ImageViewer";
    let activeImage = "";
    
    var opt = {
        fileTypes: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'],
        extName: extName
    }
    editor.addTabType("image", opt, function( tab ) {
        tab.layout.options = "VCenter,Center"
        var src = "/" + tab.filePath;
        scr = src.replace(/\/\//gm, "/");
        var img = document.createElement("img");
        tab.appendChild(img);
        img.style.position = "absolute";
        img.style.top  = "50%";
        img.style.left  = "50%";
        img.style.transform  = "translate(-50%, -50%)";
        img.style.maxWidth  = "95%";
        img.style.maxHeight  = "95%";
        img.style.width  = "auto";
        img.style.height  = "auto";
        img.src = scr;
    });
    
    var hlp = ui.addButtonGroup(editor.header.left, ["edit", "delete"], "Small,Icon");
    hlp.toolTips = ["Rename image", "Remove image"];
    hlp.setOnTouch(function(text, index) {
        var tab = editor.tab.getActive();
        console.log( tab );
        if(tab.type == "image") {
            let dlg = null;
            if(text == "edit") {
                dlg = ui.addDialog("Rename image", "", ["Close","Rename"]);
                const lay = ui.addLayout(dlg.layout, "Linear", "VCenter", "20rem");
                const edt = ui.addTextField(lay, tab.name, "Outlined", 1);
                edt.label = "Enter new name";
                dlg.setOnAction(action => {
                    let newName = edt.text;
                    let newFilePath = tab.folderPath + "/" + newName;
                    editor.file.rename(tab.filePath, newFilePath, function() {
                        console.log( "Rename image" );
                    });
                });
                dlg.show();
            }
            else if(text == "delete") {
                let txt = 'Do you want to remove "'+tab.name+'"';
                dlg = ui.addDialog("Remove image",txt, ["Close", "Remove"]);
                dlg.setOnAction(action => {
                    if(action == "Remove") {
                        editor.file.delete(tab.filePath, function() {
                            editor.showMessage(tab.name + " image has been deleted");
                            let i = editor.tab;
                            editor.tab.close({
                                filePath: tab.filePath,
                                type: "image"
                            });
                        });
                    }
                });
                dlg.show();
            }
        }
    });
    editor.registerHeaderItem(hlp, { tabType: "image" });
    hlp.hide();
});
