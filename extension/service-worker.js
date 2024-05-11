chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: "openPopup",
        title: "test",
        type: "normal",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
        chrome.runtime.sendMessage("show-popup", (response) => {
            console.log("REPONSE");
            console.log(response);
        });
    }
);