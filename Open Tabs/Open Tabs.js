
/*
# Open Tabs

Version: 1.0.2<br>
Author: Jumar B. Hamac<br>
Copyright: droidscript.org

An extension to display, close and select the currently open tabs.
*/


editor.registerExtension("Open Tabs", {
    desc: "Extension to display the currently opened tabs.",
    version: "1.0.2"
}, function() {
    const extName = "Open Tabs";
    const showOnSidebar = true;
    
    var fileTypes = "js,html,css,md,txt,png,jpg,jpeg,mpeg,json,py";
    var list = [];
    var tabsData = [];
    var chosenIndex = "";
    var items = ["clear_all:Close others"];
    var ctxMenu = ui.addMenu(null, [], "Icons,Dense");
    ctxMenu.setOnTouch(function(text, icon, i) {
        if(text == "Close others") {
            let arr = [];
            for(let i = 0; i < list.length; i++) {
            	if(i !== chosenIndex ) arr.push(i);
            }
            editor.tab.closeRange( arr );
        }
    });
    
    var leftPanel = editor.getLeftPanel( extName );
    var tabsList = editor.addList(leftPanel, [], "Image", 1, 0.8);
    tabsList.emptyText = "No tabs open";
    tabsList.setOnAction( function( item, i ) {
        editor.tab.close( i );
    });
    tabsList.setOnTouch( function( item, i ) {
        editor.tab.open( i );
    });
    tabsList.setOnContextMenu(function(item, i, e) {
        if( list.length > 1 ) {
            items = [":"+item[1], "clear_all:Close others"];
            ctxMenu.list = items;
            ctxMenu.show(e.clientX, e.clientY);
            chosenIndex = i;
        }
    });
    
    if(showOnSidebar === true) {
    	var navItem = editor.addNavBarItem("menu", {title: extName}, function() {
            leftPanel.toggle();
        });
    }
    
    var closeAll = editor.addLeftPanelHeaderItem(extName, "clear_all", {title: "Close All Tabs"}, function() {
        editor.tab.closeAll();
    })
    
    // add an item when tab is open
    editor.tab.addListener("onOpen", function( data ) {
        let ext = data.name.substr(data.name.lastIndexOf(".")+1).toLowerCase();
        let img = editor.dir.getExtFilePath(editor.name, "Img/file.png");
        if( fileTypes.includes(ext) ) {
            img = editor.dir.getExtFilePath(editor.name, "Img/"+ext+".png");
        }
        let path = data.folderPath.split("/").pop();
        list.push([img, data.name, path, "close"]);
        tabsList.list = list;
        tabsData.push(data);
        highlightActiveTab();
    });
    
    // remove an item when tab is close
    editor.tab.addListener("onClose", function( tab ) {
        var n = tabsData.findIndex( m => {
            var a = m.filePath == tab.filePath;
            var b = m.type == tab.type;
            return a && b;
        });
        list.splice(n, 1);
        tabsData.splice(n, 1);
        tabsList.list = list;
    });
    
    // add highlight to the active tab
    editor.tab.addListener("onSelect", function( data ) {
        var n = tabsData.findIndex( m => (m.filePath==data.filePath && m.type==data.type));
        tabsList.active = n;
    });
    
    function highlightActiveTab() {
        var activeTab = editor.tab.getActiveTab();
        let o = -1;
        if( activeTab ) {
            o = tabsData.findIndex( m => {
        		var a = m.filePath == activeTab.filePath;
                var b = m.type == activeTab.type;
                return a && b;
            });
        }
        tabsList.active = o;
    }
});