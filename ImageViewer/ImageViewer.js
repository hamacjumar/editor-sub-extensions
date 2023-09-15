
/*
# ImageViewer

Version: 1.1.1<br>
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
    version: "1.1.1",
    desc: "A simple image viewer extension."
}, function() {
    var extName = "ImageViewer";
    
    editor.addTabType("image", {}, function( tab ) {
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
});