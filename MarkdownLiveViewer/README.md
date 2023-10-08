# MarkdownLiveViewer

Version: 1.0.0<br>
Author: Jumar B. Hamac<br>
Copyright: droidscript.org

Live viewer and editor for markdown files.

`MarkdownLiveViewer` will add a `"md-live-view"` type of TabWindow which you can use to open your markdown file.

Example usage:

```
editor.open("/MyProject/markdown-file.md", {
	type: "md-live-view"
});
```

Uses the **MarkedJS** library. See more details here https://marked.js.org/.


> NOTE: You can also manually set the `"md-live-view"` as the default tab type when opening markdown files in the **Set Defaults** section in the Editor Settings.

### Notable releases

Version 1.0.0 - October 06, 2023
- Initial release.