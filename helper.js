function saveToLocal(data) {
    getFromLocal(function (localData) {
        if (localData) {
            var newData = localData.concat('\r\n', data)
            chrome.storage.sync.set({
                data: newData
            }, function () {
                console.log('Value is set to a: ' + newData);
            });
        } else {
            chrome.storage.sync.set({
                data: data
            }, function () {
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
    chrome.storage.sync.get(['data'], function (result) {
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
    chrome.storage.sync.remove(['data'], function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
}

function getFileTypeFromLocal(retData) {
    var localData = "";
    chrome.storage.sync.get(['type'], function (result) {
        localData = result.type
        console.log("get local:", localData)
        return retData(localData);
    });
}

function typeBinder(type) {
    getFileTypeFromLocal(function (localData) {
        console.log("send to compare", localData)
        if (localData == "txt") {
            // console.log("comparison output:",MIME_TYPE,EXTENSION)
            return type(TEXT_DOC_MIME_TYPE, TEXT_FILE_EXTENSION)
        } else if (localData == "doc") {
            // console.log("comparison output:",MIME_TYPE,EXTENSION)
            return type(WORD_DOC_MIME_TYPE, WORD_FILE_EXTENSION)
        }
    })
}
