var openTabs = {};
var closedTab = null;

chrome.tabs.getAllInWindow(null, function(tabsInWindow) {
    for (var i=0; i<tabsInWindow.length; i++) {
        openTabs[tabsInWindow[i].id] = tabsInWindow[i];
    }
});

chrome.tabs.onCreated.addListener(function(tab) {
    openTabs[tab.id] = tab;
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    openTabs[tabId] = tab;
});

chrome.tabs.onRemoved.addListener(function(tabId) {
    closedTab = openTabs[tabId];
    delete openTabs[tabId];
});
