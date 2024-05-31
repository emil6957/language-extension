function ensureSendMessage(tabId, message, callback) {
    console.log("sending ping");
    chrome.tabs.sendMessage(tabId, {ping: true}, function(response) {
        console.log("ping sent");
        if(response && response.pong) {
            console.log("pong sent back");
            chrome.tabs.sendMessage(tabId, message, callback);
        } else {
            console.log("INJECTING CONTENT SCRIPT");
            chrome.tabs.executeScript(tabId, {file: "content.js"}, function() {
                if(chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    throw Error("unable to inject script into tab " + tabId);
                }
                console.log("SENDING MESSAGE NOW");
                chrome.tabs.sendMessage(tabId, message, callback);
            });
        }
    });
}

chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: "openPopup",
        title: "test",
        type: "normal",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
        console.log("INFO");
        console.log(info.selectionText);
        ensureSendMessage(tab.id, {showPopup: true, selectionText: info.selectionText});
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendReponse) {
        console.log("Request");
        console.log(request);
        console.log("Sender");
        console.log(sender);
        console.log("sent response");
        sendReponse(true);
    }
);