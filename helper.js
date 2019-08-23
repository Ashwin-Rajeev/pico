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

function getFromLocal(retData) {
    var localData = ""
    chrome.storage.sync.get(['data'], function(result) {
        localData = result.data
        return retData(localData);
    });
}

function clearSelectionHighlightColor() {
    var elems = document.querySelectorAll('[style="background-color: yellow;"]');
    console.log(elems)
    var index = 0,
        length = elems.length;
    for (; index < length; index++) {
        elems[index].style.backgroundColor = ""
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