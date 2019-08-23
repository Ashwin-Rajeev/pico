function saveToLocal(data) {
    getFromLocal(function(localData) {
        if (localData) {
            var newData = localData.concat('\r\n', data)
            chrome.storage.sync.set({
                data: newData
            }, function() {
                console.log('Value is set to a: ' + newData);
            });
        } else {
            chrome.storage.sync.set({
                data: data
            }, function() {
                console.log('Value is set to b: ' + data);
            });
        }
    });
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

function addClassToElement(selection, selectedText) {
    var span = document.createElement('SPAN');
    span.classList.add("mystyle-pico");
    span.textContent = selectedText;
    var range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);
}

function getFromLocal(retData) {
    var localData = ""
    chrome.storage.sync.get(['data'], function(result) {
        localData = result.data
        return retData(localData);
    });
}

function clearSelectionHighlightColor() {
    var elems = document.querySelectorAll("span.mystyle-pico");
    var index = 0,
        length = elems.length;
    for (; index < length; index++) {
        elems[index].outerHTML = elems[index].innerHTML
    }
}

function clearLocalStorage() {
    chrome.storage.sync.remove(['data'], function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
}