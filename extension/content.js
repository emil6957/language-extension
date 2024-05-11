function showPopup() {
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
    document.documentElement.appendChild(popupDivContainer);
}

chrome.runtime.onMessage.addListener((request) => {
        console.log("Request");
        console.log(request);
        showPopup();
    }
);
