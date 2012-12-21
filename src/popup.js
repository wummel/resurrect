var openTabs = chrome.extension.getBackgroundPage().openTabs;
var closedTab = chrome.extension.getBackgroundPage().closedTab;

document.addEventListener('DOMContentLoaded', function() {
    var list = document.createElement("ul");
    var listelem = document.createElement("li");
    if (closedTab !== null) {
        var img = document.createElement("img");
        img.src = closedTab.favIconUrl;
        var url = document.createElement("a");
        url.href = "#";
        (function() {
            var tab = closedTab;
            url.addEventListener('click', function() {
                chrome.tabs.create({url: tab.url}, function(t) {
                    openTabs[t.id] = t;
                });
            window.close();
            });
        })();
        url.title = closedTab.title + " - " + closedTab.url;
        url.appendChild(img);
        url.appendChild(document.createTextNode(closedTab.title));
        listelem.appendChild(url);
    }
    else {
        listelem.style.fontStyle = "italic";
        listelem.appendChild(document.createTextNode("No closed tab yet."));
    }
    list.appendChild(listelem);
    document.body.appendChild(list);
});
