chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: "openPopup",
        title: "test",
        type: "normal",
        contexts: ["selection"]
    });
});

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

chrome.contextMenus.onClicked.addListener((info, tab) => {
    }
);

(async () => {
    console.log("RUNNING FUNCTION IN SERVICE WORKER");
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, "testing message");
    console.log(response);
})();