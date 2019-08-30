chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message == "add_data") {
    var selection = getSelectionText();
    var theText = selection.toString();
    if (theText.length > 0) {
      highlight(HIGHLIGHT_COLOR);
      saveToLocal(theText);
    } else {
      alert("Please highlight some text");
    }
  } else if (request.message == "download_file") {
    getFromLocal(function(data) {
      if (data) {
        saveTextAsFile(data);
        clearLocalStorage("data");
      } else {
        alert("Nothing selected to download");
      }
    });
  } else if (request.message == "clear_selection") {
    clearLocalStorage("data");
    clearSelectionHighlightColor();
  } else if (request.message == "file_type_selection") {
    fileType(request.payload);
  } else if (request.message == "get_selected_file_type") {
    getFileTypeFromLocal(function(val) {
        sendResponse({ type: val });
    });
  }
  return true;
});
