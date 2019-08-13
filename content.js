function getSelectionText() {
    var selectedText = ""
    if (window.getSelection) {
        selectedText = window.getSelection().toString()
    }
    return selectedText
}

function saveTextAsFile(data) {
    console.log(data)
    var textToWrite = data;
    var n = Math.floor(Date.now() / 1000)
    var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
    var fileNameToSaveAs = n + ".txt";

    var downloadLink = document.createElement("a");

    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "My Hidden Link";
    window.URL = window.URL || window.webkitURL;
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            var thetext = getSelectionText()
            if (thetext.length > 0) {
                // console.log(thetext)
                saveTextAsFile(thetext)

            }
        }
    }
);
