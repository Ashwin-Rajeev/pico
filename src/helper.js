function saveToLocal(data, id) {
  getFromLocal(function (localData) {
    if (localData) {
      // var newData = localData.concat("\r\n", data);
      localData[id] = data
      console.log(localData)
      chrome.storage.local.set(
        {
          data: localData
        },
        function () {
          console.log("Value is set to a: " + data);
        }
      );
    } else {
      var dict = {}
      dict[id] = data
      console.log(dict)
      chrome.storage.local.set(
        {
          data: dict
        },
        function () {
          console.log("Value is set to b: " + data);
        }
      );
    }
  });
}

function destroyClickedElement(event) {
  document.body.removeChild(event.target);
}

function getFromLocal(retData) {
  var localData = "";
  chrome.storage.local.get(["data"], function (result) {
    localData = result.data;
    return retData(localData);
  });
}

function clearSelectionHighlightColor() {
  var elems = document.querySelectorAll('[style="background-color: yellow;"]');
  var index = 0,
    length = elems.length;
  for (; index < length; index++) {
    elems[index].removeAttribute("style");
    elems[index].removeAttribute("id");
  }
}

function clearLocalStorage(key) {
  chrome.storage.local.remove([key], function () {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
  });
}

function getFileTypeFromLocal(retData) {
  var localData = "";
  chrome.storage.local.get(["type"], function (result) {
    localData = result.type;
    return retData(localData);
  });
}

function typeBinder(type) {
  getFileTypeFromLocal(function (localData) {
    if (localData === "txt") {
      return type(TEXT_DOC_MIME_TYPE, TEXT_FILE_EXTENSION);
    } else if (localData === "doc") {
      return type(WORD_DOC_MIME_TYPE, WORD_FILE_EXTENSION);
    } else if (localData === "odt") {
      return type(OPEN_OFFICE_DOC_MIME_TYPE, OPEN_OFFICE_FILE_EXTENSION);
    } else {
      return type(TEXT_DOC_MIME_TYPE, TEXT_FILE_EXTENSION);
    }
  });
}

var val = 0

function addIdToElement(selection) {
  var host = window.location.hostname
  var id = ""
  console.log(selection.toString())
  var node = selection.anchorNode
  if (node) {
    console.log(node.parentElement)
    var element = node.parentElement
    val = val + 1
    console.log(val)
    id = host + "-" + "pico" + "-" + val
    element.setAttribute("id", id);
  }
  console.log("No nodes available")
  return id
}

function deleteSpecific() {
  var selection = getSelectionText()
  var node = selection.anchorNode
  if (node) {
    console.log(node.parentElement)
    var element = node.parentElement
    var id = element.getAttribute("id");
    deleteDataFromLocalStorage(id)
    element.removeAttribute("style");
    element.removeAttribute("id");
  }
}

function deleteDataFromLocalStorage(key) {
  getFromLocal(function (localData) {
    if (localData) {
      delete localData[key]
      console.log(localData)
      chrome.storage.local.set(
        {
          data: localData
        },
        function () {
          console.log("Value is set to: " + localData);
        });
    }
  })
}
