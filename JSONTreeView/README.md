# JSONTreeView

Version: 1.0.1<br>
Author: Jumar B. Hamac<br>
Copyright: droidscript.org

An extension to view and edit json files in a treeview format.

`JSONTreeView` will add a `"json-tree-view"` type of TabWindow which you can use to open your json file.

Example usage:

```
editor.open("/MyProject/data.json", {
	type: "json-tree-view"
});
```

Uses the **JSONView** library by **richard-livingston**

GitHub: *https://github.com/richard-livingston/json-view*

> NOTE: You can also manually set the `"json-tree-view"` as the default tab type when opening json files in the **Set Defaults** section in the Editor Settings.

### Notable releases

Version 1.0.1 - October 06, 2023
- Remove JSONTreeView instance to the jsonViews array when the corresponding tab is close.

Version 1.0.0 - September 30, 2023
- Initial release.