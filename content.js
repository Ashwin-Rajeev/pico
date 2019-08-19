function makeEditableAndHighlight(colour) {
    var range, sel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    document.designMode = "on";
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    if (!document.execCommand("HiliteColor", false, colour)) {
        document.execCommand("BackColor", false, colour);
    }
    document.designMode = "off";
}

function highlight(colour) {
    var range, sel;
    if (window.getSelection) {
        try {
            if (!document.execCommand("BackColor", false, colour)) {
                makeEditableAndHighlight(colour);
            }
        } catch (ex) {
            makeEditableAndHighlight(colour)
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.execCommand("BackColor", false, colour);
    }
}


function getSelectionText() {
    var selectedText = ""
    if (window.getSelection) {
        selectedText = window.getSelection().toString()
    }
    return selectedText
}

function saveTextAsFile(data) {
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

function saveToLocal(data) {
    getFromLocal(function (localData) {
        if (localData) {
            var newData = localData + "\r\n" + data
            chrome.storage.sync.set({ data: newData }, function () {
                console.log('Value is set to a: ' + newData);
            });
        } else {
            chrome.storage.sync.set({ data: data }, function () {
                console.log('Value is set to b: ' + data);
            });
        }
    });
}

function getFromLocal(retData) {
    var localData = ""
    chrome.storage.sync.get(['data'], function (result) {
        localData = result.data
        return retData(localData);
    });
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message == "add_data") {
            theText = getSelectionText()
            if (theText.length > 0) {
                highlight('yellow')
                saveToLocal(theText)
            } else {
                alert("Please highlight some text")
            }
        } else if (request.message == "download_file") {
            getFromLocal(function (data) {
                if (data) {
                    chrome.storage.sync.remove(['data'], function () {
                        var error = chrome.runtime.lastError;
                        if (error) {
                            console.error(error);
                        }
                    });
                    saveTextAsFile(data)
                } else {
                    alert("Nothing selected to download")
                }
            });
        }
    });
