const styles = `
    display: none;
    position: absolute;
    background-color: red;
    width: 15rem;
    height: 15rem;
    z-index: 9999;
`

const html = `
    <div id="language-popup-content" style="${styles}">
        <p>POPUP CONTENT DIV</p>
    </div>
` 

const popupDivContainer = document.createElement("div");
popupDivContainer.setAttribute("id", "language-popup")
popupDivContainer.innerHTML = html;
document.documentElement.appendChild(popupDivContainer);

// Loads and sends request to load popup
// (async () => {
//     console.log("SENDING REQUEST");
//     const response = await chrome.runtime.sendMessage("showPopup");
//     console.log(response);
//     if (response === true) {
//         document.documentElement.appendChild(popupDivContainer);
//     }
// })();

let mousePos = { x: 0, y: 0 };
document.onmousedown = function(e) {
    const popupDivContent = document.getElementById("language-popup-content");

    if(e.button === 0 || e.button === 2) {
        console.log("CLICK");
        console.log(e);
        if(!popupDivContent.contains(e.target)) {
            console.log("HIDDING POPUP");
            popupDivContent.style.display = "none";
        }
    }

    if(e.button === 2) {
        console.log("right click");
        console.log(e);
        mousePos.x = e.pageX;
        mousePos.y = e.pageY;
        const content = popupDivContainer.firstChild;
        console.log(popupDivContainer);
        console.log(popupDivContent);
        console.log(content);
        console.log(html);
        popupDivContent.style.top = `${mousePos.y + 10}px`;
        popupDivContent.style.left = `${mousePos.x}px`;
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        const popupDivContent = document.getElementById("language-popup-content");
        if(request.ping) {
            console.log("sending pong");
            sendResponse({pong: true});
            return;
        }

        if(request.showPopup) {
            console.log("showing popup");
            popupDivContent.style.display = "block";
            sendResponse({showPopup: true, mousePos: mousePos});
            return;
        }

        if(request.selectionText) {
            console.log("setting selection text");
            const content = document.createElement("p");
            content.textContent = request.selectionText;
            popupDivContent.append(content);
        }

        console.log("--- New message received ---");
        console.log(request);
    }
);