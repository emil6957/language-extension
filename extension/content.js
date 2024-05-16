const styles = `
    position: absolute;
    top: 0;
    left: 0;
    background-color: red;
    width: 15rem;
    height: 15rem;
    z-index: 9999;
`

const html = `
    <div style="${styles}">
        <p>POPUP CONTENT DIV</p>
    </div>
` 

const popupDivContainer = document.createElement("div");
popupDivContainer.setAttribute("id", "language-popup")
popupDivContainer.innerHTML = html;

// Loads and sends request to load popup
(async () => {
    console.log("SENDING REQUEST");
    const response = await chrome.runtime.sendMessage("showPopup");
    console.log(response);
    if (response === true) {
        document.documentElement.appendChild(popupDivContainer);
    }
})();

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("REQUEST IN CONTENT");
        console.log(request);
        console.log("Sender tab url");
        console.log(sender.tab.url)
        sendResponse("content sending message back from listenr");
    }
)