function addData() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "add_data" });
  });
}

function downloadData() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "download_file" });
  });
}

function clearSelection() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "clear_selection" });
  });
}

function addFileType() {
  var file = document.getElementById("file");
  var value = file.options[file.selectedIndex].value;
  file.options[file.selectedIndex].selected = true;
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      message: "file_type_selection",
      payload: value
    });
  });
  getFileType();
}

function getFileType() {
  var file = document.getElementById("file");
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { message: "get_selected_file_type" },
      function(response) {
        if (chrome.runtime.lastError) {
          console.log("Error");
        } else {
          if (response.type === "txt") {
            file.options[1].selected = true;
          } else if (response.type === "doc") {
            file.options[2].selected = true;
          } else if (response.type === "odt") {
            file.options[3].selected = true;
          } else {
            file.options[0].selected = true;
          }
        }
      }
    );
  });
}

document.addEventListener("DOMContentLoaded", function() {
  getFileType();
  document.getElementById("button1").addEventListener("click", addData);
  document.getElementById("button2").addEventListener("click", downloadData);
  document.getElementById("button3").addEventListener("click", clearSelection);
  document.getElementById("file").addEventListener("click", addFileType);
});
