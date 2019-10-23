function getSelectionText() {
  var selection;
  if (window.getSelection) {
    selection = window.getSelection();
  }
  return selection;
}

function fileType(value) {
  if (value === "txt") {
    chrome.storage.local.set(
      {
        type: value
      },
      function() {
        console.log("Value is set to : " + value);
      }
    );
  } else if (value === "doc") {
    chrome.storage.local.set(
      {
        type: value
      },
      function() {
        console.log("Value is set to : " + value);
      }
    );
  } else if (value === "odt") {
    chrome.storage.local.set(
      {
        type: value
      },
      function() {
        console.log("Value is set to : " + value);
      }
    );
  }
}

function makeEditableAndHighlight(colour) {
  var range,
    sel = window.getSelection();
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
      makeEditableAndHighlight(colour);
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    range.execCommand("BackColor", false, colour);
  }
}

function saveTextAsFile(data) {
  var textToWrite = data;
  var n = Math.floor(Date.now() / 1000);
  typeBinder(function(mimeType, fileExtension) {
    var FileAsBlob = new Blob([textToWrite], {
      type: mimeType
    });
    var fileNameToSaveAs = n + fileExtension;

    var downloadLink = document.createElement("a");

    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "My Hidden Link";
    window.URL = window.URL || window.webkitURL;
    downloadLink.href = window.URL.createObjectURL(FileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  });
}

function formatData(data) {
  var formattedData = "";
  for (var key in data) {
    var value = data[key];
    formattedData = formattedData + "\r\n" + value;
  }
  return formattedData;
}
