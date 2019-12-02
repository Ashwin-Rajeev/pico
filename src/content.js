chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  const {
    addData,
    downloadFile,
    clearSelection,
    clearSpecific,
    fileTypeSelection,
    getFileType
  } = contentOperations();
  if (request.message === addData) {
    var selection = getSelectionText();
    var theText = selection.toString();
    if (theText.length > 0) {
      highlight(HIGHLIGHT_COLOR);
      var id = addIdToElement(selection);
      saveToLocal(theText, id);
    } else {
      alert("Please highlight some text");
    }
  } else if (request.message === downloadFile) {
    getFromLocal(function(data) {
      if (typeof data === "object" && Object.keys(data).length) {
        var formattedData = formatData(data);
        saveTextAsFile(formattedData);
        clearLocalStorage("data");
      } else {
        alert("Nothing selected to download");
      }
    });
  } else if (request.message === clearSelection) {
    clearLocalStorage("data");
    clearSelectionHighlightColor();
  } else if (request.message === clearSpecific) {
    var DeletedId = deleteSpecific();
    deleteDataFromLocalStorage(DeletedId)
  } else if (request.message === fileTypeSelection) {
    fileType(request.payload);
  } else if (request.message === getFileType) {
    getFileTypeFromLocal(function(val) {
      sendResponse({ type: val });
    });
  }
  return true;
});

function contentOperations() {
  const addData = "add_data";
  const downloadFile = "download_file";
  const clearSelection = "clear_selection";
  const clearSpecific = "clear_specific_selection";
  const fileTypeSelection = "file_type_selection";
  const getFileType = "get_selected_file_type";
  return {
    addData,
    downloadFile,
    clearSelection,
    clearSpecific,
    fileTypeSelection,
    getFileType
  };
}
