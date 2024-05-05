import "./sw-omnibox.js";
import "./sw-tips.js";

chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: "1",
        title: "test",
        type: "normal",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(
    function(info, tab) {
        console.log(info.selectionText)
        console.log("INFO BELOW");
        console.log(info);
        console.log("TAB BELOW");
        console.log(tab);
    }
)