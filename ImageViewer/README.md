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

## How to install?

- Copy the `ImageViewer.js` file of the sub-extension into the `"Extensions/Edit/Editor"` folder in your phone's DroidScript directory.
- Reload DroidScript's WiFi IDE.